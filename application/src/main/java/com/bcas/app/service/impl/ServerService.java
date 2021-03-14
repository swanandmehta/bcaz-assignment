package com.bcas.app.service.impl;

import com.bcas.app.dto.WeburlDetailsDto;
import com.bcas.app.entity.Server;
import com.bcas.app.exception.InvalidServerIdException;
import com.bcas.app.exception.InvalidWeburlException;
import com.bcas.app.repository.IServerRepository;
import com.bcas.app.service.IServerService;
import org.apache.http.Header;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;
import java.util.Scanner;

@Service
@Primary
public class ServerService implements IServerService {

    private final IServerRepository repository;

    public ServerService(IServerRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Server> getAll() {
        return repository.findAll();
    }

    @Override
    @Transactional
    public Server save(Server server) {
        return repository.save(server);
    }

    @Override
    @Transactional
    public Server update(Integer id, Server server) {
        if (!repository.existsById(id)) {
            throw new InvalidServerIdException("Could not find the Server ID :" + id, 101);
        }
        return repository.save(server);
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        Server server = repository.findById(id)
                .orElseThrow(new InvalidServerIdException("Could not find the Server with ID :" + id, 101));
        repository.delete(server);
    }

    @Override
    public Server findById(Integer id) {
        return repository.findById(id)
                .orElseThrow(new InvalidServerIdException("Could not find the Server with ID :" + id, 101));
    }

    @Override
    public WeburlDetailsDto findTitle(Integer id) {
        Server server = this.findById(id);
        CloseableHttpClient httpclient = null;
        try {
            httpclient = HttpClients.createDefault();
            HttpGet httpget = new HttpGet(server.getWeburl());
            HttpResponse httpresponse = httpclient.execute(httpget);
            String content = EntityUtils.toString(httpresponse.getEntity());
            WeburlDetailsDto dto = new WeburlDetailsDto();
            dto.setTitle(content.substring(content.indexOf("<title>") + 7, content.indexOf("</title>")));
            return dto;
        } catch (ClientProtocolException e) {
            throw new InvalidWeburlException("Could not send the request to server", 103);
        } catch (IOException e) {
            throw new InvalidWeburlException("Could not load the response from server", 104);
        } finally {
            if(httpclient != null){
                try {
                    httpclient.close();
                } catch (IOException e) {
                    throw new InvalidWeburlException("Could not close the httpclient.", 104);
                }
            }
        }

    }
}
