package com.bcas.app.exception;

import lombok.Getter;

import java.util.function.Supplier;

@Getter
public class InvalidServerIdException extends RuntimeException implements Supplier<InvalidServerIdException> {

    private String message;
    private Integer code;

    public InvalidServerIdException(String message, Integer code) {
        this.message = message;
        this.code = code;
    }

    @Override
    public InvalidServerIdException get() {
        return this;
    }
}
