package com.oda.boxbreak.services;

import com.oda.boxbreak.dto.ActiveBoxBreaksDto;
import com.oda.boxbreak.dto.BoxBreakDto;
import com.oda.boxbreak.dto.BoxBreakExtDto;
import com.oda.boxbreak.dto.UserWithTeamsDto;
import com.oda.boxbreak.interfaces.BoxBreak;
import com.oda.boxbreak.interfaces.UserBoxBreakGet;
import com.oda.boxbreak.model.BoxBreakEntity;
import com.oda.boxbreak.repository.BoxBreakRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BoxBreakService implements BoxBreak {
    private final BoxBreakRepository repository;
    private final UserBoxBreakGet userBoxBreakGet;

    @Override
    @Transactional
    public void add(String author, String name, List<String> teams, List<String> order, String type) {
        BoxBreakEntity e = BoxBreakEntity.of(name, author, teams, order, type);
        repository.save(e);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ActiveBoxBreaksDto> getActives() {
        return repository.findAllByActiveTrue()
                .stream()
                .map(this::map)
                .collect(Collectors.groupingBy(BoxBreakDto::getType))
                .entrySet()
                .stream()
                .map(entry -> ActiveBoxBreaksDto.of(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public BoxBreakExtDto getById(Long id) {
        return repository.findById(id).map(this::mapExt).orElseThrow(RuntimeException::new);
    }

    @Override
    @Transactional
    public void deactivate(Long id) {
        BoxBreakEntity entity = repository.findById(id).orElseThrow(RuntimeException::new);
        entity.setActive(false);
        repository.save(entity);
    }

    private BoxBreakDto map(BoxBreakEntity e) {
        return new BoxBreakDto(e.getId(), e.getAuthor(), e.getName(), e.getType());
    }

    private BoxBreakExtDto mapExt(BoxBreakEntity e) {
        BoxBreakExtDto dto = new BoxBreakExtDto();
        dto.setId(e.getId());
        dto.setAuthor(e.getAuthor());
        dto.setName(e.getName());
        dto.setOrder(e.getOrder());
        dto.setResult(Collections.emptyList()); //todo
        Map<String, List<String>> userMap = userBoxBreakGet.getUsers(e.getId())
                .stream()
                .collect(Collectors.toMap(UserWithTeamsDto::getName, UserWithTeamsDto::getTeams));
        List<UserWithTeamsDto> users = e.getOrder()
                .stream()
                .distinct()
                .map(user -> UserWithTeamsDto.of(user, userMap.getOrDefault(user, Collections.emptyList())))
                .collect(Collectors.toList());
        dto.setUsersWithTeams(users);
        dto.setTeams(e.getTeams());
        dto.setType(e.getType());
        return dto;
    }
}
