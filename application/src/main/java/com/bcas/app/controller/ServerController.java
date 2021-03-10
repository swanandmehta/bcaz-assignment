package com.bcas.app.controller;

import com.bcas.app.dto.ServerDto;
import com.bcas.app.dto.WeburlDetailsDto;
import com.bcas.app.entity.Server;
import com.bcas.app.service.IServerService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/server")
public class ServerController {

    private final IServerService serverService;
    private final ModelMapper modelMapper;

    public ServerController(IServerService serverService, ModelMapper modelMapper) {
        this.serverService = serverService;
        this.modelMapper = modelMapper;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ServerDto> getAll() {
        return serverService.getAll()
                                .stream()
                                .map(server -> modelMapper.map(server, ServerDto.class))
                                .collect(Collectors.toList());
    }

    @GetMapping(path = "/weburl/title/{id}")
    @ResponseStatus(HttpStatus.OK)
    public WeburlDetailsDto findTitle(@NotNull @PathVariable("id") Integer id) {
        return serverService.findTitle(id);
    }

    @GetMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ServerDto get(@NotNull @PathVariable("id") Integer id) {
        Server existing = serverService.findById(id);
        return modelMapper.map(existing, ServerDto.class);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ServerDto save(@NotNull @RequestBody ServerDto dto) {
        Server toSave = modelMapper.map(dto, Server.class);
        Server created = serverService.save(toSave);
        return modelMapper.map(created, ServerDto.class);
    }

    @PatchMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ServerDto update(@NotNull @PathVariable("id") Integer id, @RequestBody ServerDto dto) {
        Server toSave = modelMapper.map(dto, Server.class);
        Server updated = serverService.update(id, toSave);
        return modelMapper.map(updated, ServerDto.class);
    }

    @DeleteMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update(@NotNull @PathVariable("id") Integer id) {
        serverService.delete(id);
    }
}
