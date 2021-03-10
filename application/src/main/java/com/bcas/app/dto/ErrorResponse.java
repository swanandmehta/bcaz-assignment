package com.bcas.app.dto;

import lombok.Getter;
@Getter
public class ErrorResponse implements IDto {

    private String message;
    private Integer errorCode;

    public ErrorResponse(String message, Integer errorCode) {
        this.message = message;
        this.errorCode = errorCode;
    }
}
