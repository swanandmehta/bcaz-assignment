package com.bcas.app.service;

import com.bcas.app.dto.WeburlDetailsDto;
import com.bcas.app.entity.Server;

import java.util.List;

public interface IServerService {

    List<Server> getAll();

    Server save(Server server);

    Server update(Integer id, Server server);

    void delete(Integer id);

    Server findById(Integer id);

    WeburlDetailsDto findTitle(Integer id);
}
