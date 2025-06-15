package com.project.GestureBotApplication.service;

import com.project.GestureBotApplication.dto.PayloadDTO;
import com.project.GestureBotApplication.entity.BotStatus;
import com.project.GestureBotApplication.repository.BotStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommandServiceImpl implements CommandService{

    @Autowired
    private BotStatusRepository repository;

    @Override
    public String getLatestCommand(Integer botId) {
        return repository.getLatestGestureByBotId(botId);
    }

    @Override
    public void setLatestCommand(PayloadDTO payload) {
        repository.updateGestureByBotId(payload.getCommand(), payload.getBotId());
    }

    @Override
    public List<BotStatus> getStatusAll() {
        return repository.findAll();
    }

    @Override
    public void saveStatus(BotStatus status) {
        status.setId(null);
        repository.save(status);
    }

    @Override
    public List<BotStatus> getAllStatus(Integer botId) {
        return repository.findAllByBotId(botId);
    }
}
