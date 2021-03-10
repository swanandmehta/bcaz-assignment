package com.bcas.app.advice;

import com.bcas.app.dto.ErrorResponse;
import com.bcas.app.exception.InvalidServerIdException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.validation.ConstraintViolationException;

@ControllerAdvice
public class ServerControllerAdvice {

    @ExceptionHandler(InvalidServerIdException.class)
    public ResponseEntity<ErrorResponse> invalidServerIdException(InvalidServerIdException exp) {
        return new ResponseEntity<ErrorResponse>(new ErrorResponse(exp.getMessage(), exp.getCode()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponse> constraintViolationException(ConstraintViolationException exp) {
        return new ResponseEntity<ErrorResponse>(
                new ErrorResponse("One or more input fields have invalid value", 102), HttpStatus.BAD_REQUEST);
    }
}
