package com.bcas.app.dto;

import lombok.Data;

@Data
public class ServerDto implements IDto {

    private Integer id;
    private String name;
    private String hostname;
    private String ip;
    private String weburl;

}
