package com.project.GestureBotApplication.service;

import com.project.GestureBotApplication.dto.PayloadDTO;
import com.project.GestureBotApplication.entity.BotStatus;

import java.util.List;

public interface CommandService {

    String getLatestCommand(Integer botId);

    void saveStatus(BotStatus status);

    List<BotStatus> getAllStatus(Integer botId);

    void setLatestCommand(PayloadDTO payload);

    List<BotStatus> getStatusAll();

}
