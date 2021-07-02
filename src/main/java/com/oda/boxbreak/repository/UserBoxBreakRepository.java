package com.oda.boxbreak.repository;

import com.oda.boxbreak.model.UserBoxBreakEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserBoxBreakRepository extends JpaRepository<UserBoxBreakEntity, Long> {
    List<UserBoxBreakEntity> findAllByBoxBreakId(Long boBreakId);

    Optional<UserBoxBreakEntity> findByBoxBreakIdAndName(Long boxBreakId, String name);
}
