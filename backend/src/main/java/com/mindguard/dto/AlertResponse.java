package com.mindguard.dto;

import com.mindguard.entity.Alert;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlertResponse {
    private String id;
    private String patientId;
    private String journalEntryId;
    private Alert.AlertType alertType;
    private Double riskScore;
    private String alertMessage;
    private String alertSummary;
    private Boolean isAcknowledged;
    private LocalDateTime acknowledgedAt;
    private String acknowledgedBy;
    private Boolean isResolved;
    private LocalDateTime resolvedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
