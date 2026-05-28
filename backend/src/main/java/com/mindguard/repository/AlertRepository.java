package com.mindguard.repository;

import com.mindguard.entity.Alert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AlertRepository extends JpaRepository<Alert, UUID> {
    List<Alert> findByPatientIdOrderByCreatedAtDesc(UUID patientId);

    List<Alert> findByPatientIdAndAlertType(UUID patientId, Alert.AlertType alertType);

    @Query("SELECT a FROM Alert a WHERE a.patientId = :patientId AND a.alertType IN ('URGENT', 'EMERGENCY') AND a.isResolved = false ORDER BY a.createdAt DESC")
    List<Alert> findCriticalUnresolvedAlerts(@Param("patientId") UUID patientId);

    @Query("SELECT a FROM Alert a WHERE a.therapistId = :therapistId AND a.isResolved = false ORDER BY a.alertType DESC, a.createdAt DESC")
    List<Alert> findUnresolvedAlertsForTherapist(@Param("therapistId") UUID therapistId);

    List<Alert> findByJournalEntryId(UUID journalEntryId);

    @Query("SELECT a FROM Alert a WHERE a.therapistId = :therapistId ORDER BY a.createdAt DESC")
    List<Alert> findAllAlertsForTherapist(@Param("therapistId") UUID therapistId);
}
