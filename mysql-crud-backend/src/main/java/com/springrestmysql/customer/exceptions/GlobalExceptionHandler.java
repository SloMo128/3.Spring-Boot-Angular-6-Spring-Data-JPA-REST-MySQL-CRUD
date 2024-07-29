package com.springrestmysql.customer.exceptions;

import java.util.*;

import org.springframework.http.*;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.bind.MethodArgumentNotValidException;

import org.springframework.validation.FieldError;

import lombok.extern.slf4j.Slf4j;

@Slf4j(topic = "GLOBAL_EXCEPTION_HANDLER")
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

	// Validation Exception
	
	//@Override
	@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		ErrorResponse errorResponse = new ErrorResponse(new Date(), HttpStatus.UNPROCESSABLE_ENTITY.value(),
				"Validation error(s).");
		for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
			errorResponse.addValidationError(fieldError.getField(), fieldError.getDefaultMessage());
		}
		return ResponseEntity.unprocessableEntity().body(errorResponse);
	}

	// JSON Parse Exception
	
	//@Override
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		//log.error("Json Parse Error", ex);
		return ErrorBuilder.buildErrorResponse(ex, HttpStatus.BAD_REQUEST, request);
	}

	// Not Found Exception
	@ExceptionHandler(NotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public ResponseEntity<Object> handleNotFoundException(NotFoundException ex, WebRequest request) {
		log.error("Failed to find the requested element", ex);
		return ErrorBuilder.buildErrorResponse(ex, HttpStatus.NOT_FOUND, request);
	}

	// Generic Exception
	@ExceptionHandler(Exception.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public ResponseEntity<Object> handleAllUncaughtException(Exception ex, HttpStatus httpStatus, WebRequest request) {
		log.error("Unknown error occurred", ex);
		return ErrorBuilder.buildErrorResponse(ex, HttpStatus.INTERNAL_SERVER_ERROR, request);
	}

	//@Override
	public ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body, HttpHeaders headers,
			HttpStatus status, WebRequest request) {
		return ErrorBuilder.buildErrorResponse(ex, status, request);
	}
}
