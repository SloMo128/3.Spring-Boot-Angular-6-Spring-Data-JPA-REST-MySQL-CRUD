package com.springrestmysql.customer.exceptions;

import java.util.Date;
import java.util.Objects;
import java.util.regex.Pattern;

import org.apache.commons.lang3.exception.ExceptionUtils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.context.request.WebRequest;

import org.springframework.beans.factory.annotation.Value;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorBuilder {
	public static final String TRACE = "trace";
	@Value("${trace:false}")
	private static boolean printStackTrace;

	public static ResponseEntity<Object> buildErrorResponse(Exception exception, HttpStatus httpStatus,
			WebRequest request) {
		String message = exception.getMessage();
		if (exception instanceof HttpMessageNotReadableException) {
			message = exception.getMessage().split(":")[0] + ": "
					+ exception.getMessage().split(Pattern.quote("[\""))[1].split(Pattern.quote("\"]"))[0]
					+ " should be of" + exception.getMessage().split("of")[1].split("from")[0];
		}
		return buildErrorResponse(exception, message, httpStatus, request);
	}

	private static ResponseEntity<Object> buildErrorResponse(Exception exception, String message, HttpStatus httpStatus,
			WebRequest request) {
		ErrorResponse errorResponse = new ErrorResponse(new Date(), httpStatus.value(), message);
		if (printStackTrace && isTraceOn(request)) {
			errorResponse.setStackTrace(ExceptionUtils.getStackTrace(exception));
		}
		return ResponseEntity.status(httpStatus).body(errorResponse);
	}

	private static boolean isTraceOn(WebRequest request) {
		String[] value = request.getParameterValues(TRACE);
		return Objects.nonNull(value) && value.length > 0 && value[0].contentEquals("true");
	}
}
