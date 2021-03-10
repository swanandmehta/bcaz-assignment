package com.bcas.app.entity;

import com.bcas.app.constant.ValidationConstant;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
@Entity
@Table(name = "sytem")
public class Server implements IEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Integer id;

    @Column
    @NotNull @NotEmpty
    private String name;

    @Column
    @NotNull @NotEmpty
    private String hostname;

    @Column
    @NotNull @NotEmpty
    private String ip;

    @Column
    @Pattern(regexp = ValidationConstant.WEB_URL_VALIDATION_REGEX)
    private String weburl;


}
