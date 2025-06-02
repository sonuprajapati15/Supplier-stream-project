package com.travel.supplier.error;


import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.ModelAndView;


/**
 * GlobalExceptionHandler
 *
 * @author sonu.prajapati@amaexgbt.com
 * @date 30/05/25
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ModelAndView handleAllExceptions(Exception ex, Model model) {
        ModelAndView mav = new ModelAndView();
        mav.addObject("errorMessage", ex.getMessage());
        mav.addObject("errorType", ex.getMessage());
        mav.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        mav.setViewName("error"); // This should map to error.html in your templates
        return mav;
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<Object> handleMissingExceptions(Exception ex, Model model) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}