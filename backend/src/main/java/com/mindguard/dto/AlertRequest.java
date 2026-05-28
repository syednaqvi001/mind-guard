package com.mindguard.dto;

import com.mindguard.entity.Alert;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlertRequest {
    @NotNull(message = "Journal entry ID is required")
    private String journalEntryId;

    @NotNull(message = "Alert type is required")
    private Alert.AlertType alertType;

    @NotBlank(message = "Alert message is required")
    private String alertMessage;

    private String alertSummary;

    private String assignedTherapistId;
}
