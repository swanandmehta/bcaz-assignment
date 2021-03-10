package com.bcas.app.repository;

import com.bcas.app.entity.Server;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IServerRepository extends JpaRepository<Server, Integer> {

}
