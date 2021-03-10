package com.bcas.app.service;

import com.bcas.app.dto.WeburlDetailsDto;
import com.bcas.app.entity.Server;
import com.bcas.app.exception.InvalidServerIdException;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatExceptionOfType;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ServerServiceTest {

    @Autowired
    private IServerService service;

    private static Server server;

    @BeforeAll
    private static void beforeAll() {
        server = new Server();
        server.setHostname("HostName");
        server.setIp("IP");
        server.setName("Test Name");
        server.setWeburl("https://www.google.com");
    }

    @Test
    @Order(1)
    public void getAll(){
        List<Server> list = service.getAll();
        assertThat(list)
                .isNotNull();
    }

    @Test
    @Order(2)
    public void save(){
        ServerServiceTest.server = service.save(ServerServiceTest.server);
        assertThat(ServerServiceTest.server)
                .isNotNull()
                .hasNoNullFieldsOrProperties();
    }

    @Test
    @Order(3)
    public void update(){
        ServerServiceTest.server.setHostname("Google Home");

        ServerServiceTest.server = service.update(ServerServiceTest.server.getId(),
                ServerServiceTest.server);

        assertThat(ServerServiceTest.server)
                .isNotNull()
                .hasNoNullFieldsOrProperties()
                .matches(e -> e.getHostname().equals("Google Home"));
    }

    @Test
    @Order(4)
    public void findById(){

        ServerServiceTest.server = service.findById(ServerServiceTest.server.getId());

        assertThat(ServerServiceTest.server)
                .isNotNull()
                .hasNoNullFieldsOrProperties()
                .matches(e -> e.getHostname().equals("Google Home"));
    }

    @Test
    @Order(5)
    public void findTitle(){

        WeburlDetailsDto dto = service.findTitle(ServerServiceTest.server.getId());

        assertThat(dto)
                .isNotNull()
                .hasNoNullFieldsOrProperties()
                .matches(e -> e.getTitle().equals("Google"));
    }

    @Test
    @Order(6)
    public void delete(){
        service.delete(ServerServiceTest.server.getId());
        assertThatExceptionOfType(InvalidServerIdException.class)
                .isThrownBy(() ->service.findById(ServerServiceTest.server.getId()));
    }
}
