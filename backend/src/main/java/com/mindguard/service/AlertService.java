package com.mindguard.service;

import com.mindguard.dto.AlertRequest;
import com.mindguard.dto.AlertResponse;
import com.mindguard.entity.Alert;
import com.mindguard.entity.JournalEntry;
import com.mindguard.repository.AlertRepository;
import com.mindguard.repository.JournalEntryRepository;
import com.mindguard.repository.TherapistPatientRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional
public class AlertService {

    @Autowired
    private AlertRepository alertRepository;

    @Autowired
    private JournalEntryRepository journalEntryRepository;

    @Autowired
    private TherapistPatientRepository therapistPatientRepository;

    public AlertResponse createAlert(UUID userId, AlertRequest request) {
        UUID journalEntryId = UUID.fromString(request.getJournalEntryId());
        JournalEntry journalEntry = journalEntryRepository.findById(journalEntryId)
                .orElseThrow(() -> new RuntimeException("Journal entry not found"));

        if (!journalEntry.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized to create alert for this entry");
        }

        UUID therapistId = null;
        if (request.getAssignedTherapistId() != null && !request.getAssignedTherapistId().isEmpty()) {
            therapistId = UUID.fromString(request.getAssignedTherapistId());
        }

        Alert alert = Alert.builder()
                .patientId(userId)
                .journalEntryId(journalEntryId)
                .therapistId(therapistId)
                .alertType(request.getAlertType())
                .alertMessage(request.getAlertMessage())
                .alertSummary(request.getAlertSummary())
                .isAcknowledged(false)
                .isResolved(false)
                .build();

        alert = alertRepository.save(alert);
        log.info("Alert created for patient {} with type {}", userId, request.getAlertType());

        return mapToResponse(alert);
    }

    public AlertResponse getAlert(UUID userId, UUID alertId) {
        Alert alert = alertRepository.findById(alertId)
                .orElseThrow(() -> new RuntimeException("Alert not found"));

        if (!alert.getPatientId().equals(userId)) {
            throw new RuntimeException("Unauthorized to access this alert");
        }

        return mapToResponse(alert);
    }

    public List<AlertResponse> getUserAlerts(UUID userId) {
        return alertRepository.findByPatientIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<AlertResponse> getUserAlertsByType(UUID userId, Alert.AlertType alertType) {
        return alertRepository.findByPatientIdAndAlertType(userId, alertType)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<AlertResponse> getCriticalAlerts(UUID userId) {
        return alertRepository.findCriticalUnresolvedAlerts(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<AlertResponse> getTherapistAlerts(UUID therapistId) {
        return alertRepository.findUnresolvedAlertsForTherapist(therapistId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public AlertResponse acknowledgeAlert(UUID userId, UUID alertId) {
        Alert alert = alertRepository.findById(alertId)
                .orElseThrow(() -> new RuntimeException("Alert not found"));

        if (!alert.getPatientId().equals(userId)) {
            throw new RuntimeException("Unauthorized to update this alert");
        }

        alert.setIsAcknowledged(true);
        alert.setAcknowledgedAt(LocalDateTime.now());
        alert.setAcknowledgedBy(userId);

        alert = alertRepository.save(alert);
        log.info("Alert {} acknowledged", alertId);

        return mapToResponse(alert);
    }

    public AlertResponse resolveAlert(UUID userId, UUID alertId) {
        Alert alert = alertRepository.findById(alertId)
                .orElseThrow(() -> new RuntimeException("Alert not found"));

        if (!alert.getPatientId().equals(userId)) {
            throw new RuntimeException("Unauthorized to resolve this alert");
        }

        alert.setIsResolved(true);
        alert.setResolvedAt(LocalDateTime.now());

        alert = alertRepository.save(alert);
        log.info("Alert {} resolved", alertId);

        return mapToResponse(alert);
    }

    public void deleteAlert(UUID userId, UUID alertId) {
        Alert alert = alertRepository.findById(alertId)
                .orElseThrow(() -> new RuntimeException("Alert not found"));

        if (!alert.getPatientId().equals(userId)) {
            throw new RuntimeException("Unauthorized to delete this alert");
        }

        alertRepository.deleteById(alertId);
        log.info("Alert deleted: {}", alertId);
    }

    public void createAlertFromJournalEntry(JournalEntry entry) {
        if (entry.getDistressLevel() != null && entry.getDistressLevel() > 0.5) {
            Alert.AlertType alertType = Alert.AlertType.STANDARD;
            if (entry.getDistressLevel() > 0.8) {
                alertType = Alert.AlertType.URGENT;
            }
            if (entry.getDistressLevel() > 0.9) {
                alertType = Alert.AlertType.EMERGENCY;
            }

            Double riskScore = entry.getDistressLevel() * 100;

            // Find assigned therapist to link the alert correctly
            UUID therapistId = therapistPatientRepository.findByPatientId(entry.getUserId())
                    .stream()
                    .filter(tp -> tp.getIsActive())
                    .map(tp -> tp.getTherapistId())
                    .findFirst()
                    .orElse(null);

            Alert alert = Alert.builder()
                    .patientId(entry.getUserId())
                    .journalEntryId(entry.getId())
                    .therapistId(therapistId)
                    .alertType(alertType)
                    .riskScore(riskScore)
                    .alertMessage("High distress detected in journal entry: " + entry.getTitle())
                    .alertSummary("Distress level: " + String.format("%.1f", riskScore) + "%")
                    .isAcknowledged(false)
                    .isResolved(false)
                    .build();

            alertRepository.save(alert);
            log.warn("Alert created from journal entry {} with type {}", entry.getId(), alertType);
        }
    }

    private AlertResponse mapToResponse(Alert alert) {
        return AlertResponse.builder()
                .id(alert.getId().toString())
                .patientId(alert.getPatientId().toString())
                .journalEntryId(alert.getJournalEntryId().toString())
                .alertType(alert.getAlertType())
                .riskScore(alert.getRiskScore())
                .alertMessage(alert.getAlertMessage())
                .alertSummary(alert.getAlertSummary())
                .isAcknowledged(alert.getIsAcknowledged())
                .acknowledgedAt(alert.getAcknowledgedAt())
                .acknowledgedBy(alert.getAcknowledgedBy() != null ? alert.getAcknowledgedBy().toString() : null)
                .isResolved(alert.getIsResolved())
                .resolvedAt(alert.getResolvedAt())
                .createdAt(alert.getCreatedAt())
                .updatedAt(alert.getUpdatedAt())
                .build();
    }
}
