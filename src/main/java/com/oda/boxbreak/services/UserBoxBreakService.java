package com.oda.boxbreak.services;

import com.oda.boxbreak.dto.UserWithTeamsDto;
import com.oda.boxbreak.interfaces.UserBoxBreakAdd;
import com.oda.boxbreak.interfaces.UserBoxBreakGet;
import com.oda.boxbreak.model.UserBoxBreakEntity;
import com.oda.boxbreak.repository.UserBoxBreakRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class UserBoxBreakService implements UserBoxBreakAdd, UserBoxBreakGet {
    private final UserBoxBreakRepository repository;

    @Override
    @Transactional
    public void add(String name, Long boxBreakId, List<String> teams) {
        Optional<UserBoxBreakEntity> byBoxBreakIdAndName = repository.findByBoxBreakIdAndName(boxBreakId, name);
        if (byBoxBreakIdAndName.isPresent()) {
            throw new RuntimeException("для пользователя уже выбраны команды");
        }
        repository.save(UserBoxBreakEntity.of(name, boxBreakId, teams));
    }

    @Override
    @Transactional
    public void update(String name, Long boxBreakId, List<String> teams) {
        UserBoxBreakEntity e = repository.findByBoxBreakIdAndName(boxBreakId, name)
                .orElseGet(() -> UserBoxBreakEntity.of(name, boxBreakId, teams));
        if (e.getId() != null) {
            e.setTeams(teams);
        }
        repository.save(e);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserWithTeamsDto> getUsers(Long boxBreakId) {
        return repository.findAllByBoxBreakId(boxBreakId)
                .stream()
                .map(e -> UserWithTeamsDto.of(e.getName(), e.getTeams()))
                .collect(Collectors.toList());
    }
}
