package com.bcas.app.exception;

import lombok.Getter;

import java.util.function.Supplier;

@Getter
public class InvalidWeburlException extends RuntimeException implements Supplier<InvalidWeburlException>  {

    private String message;
    private Integer code;

    public InvalidWeburlException(String message, Integer code) {
        this.message = message;
        this.code = code;
    }

    @Override
    public InvalidWeburlException get() {
        return this;
    }
}
