package com.oda.boxbreak.repository;

import com.oda.boxbreak.model.BoxBreakEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoxBreakRepository extends JpaRepository<BoxBreakEntity, Long> {

    List<BoxBreakEntity> findAllByActiveTrue();
}
