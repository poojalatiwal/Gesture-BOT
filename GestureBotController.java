package com.project.GestureBotApplication.controller;

import com.project.GestureBotApplication.dto.PayloadDTO;
import com.project.GestureBotApplication.entity.BotStatus;
import com.project.GestureBotApplication.service.CommandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class GestureBotController  {

    @Autowired
    private CommandService commandService;

    @GetMapping("hello")
    public ResponseEntity<?>  helloWorld(){
        return new ResponseEntity<String>("Hello World", HttpStatus.OK);
    }

    @PostMapping("/status/update")
    public ResponseEntity<String> updateStatus(@RequestBody BotStatus status) {
        commandService.saveStatus(status);
        return ResponseEntity.ok("Status received");
    }

    /**
     * Provides the latest command for the ESP32 bot.
     * ESP32 should poll this to know the next action (e.g., forward, stop).
     */
    @GetMapping("/command/latest/{botId}")
    public ResponseEntity<String> getLatestCommand(@PathVariable Integer botId) {
        return new ResponseEntity<String>(commandService.getLatestCommand(botId), HttpStatus.OK);
    }

    /**
     * Accepts a command from the frontend/user to be sent to the ESP32 bot.
     * Example JSON:
     * {
     *   "command": "left"
     * }
     */
    @PostMapping("/command/set")
    public ResponseEntity<String> setCommand(@RequestBody PayloadDTO payload) {
        commandService.setLatestCommand(payload);
        return ResponseEntity.ok("Command updated to: " + payload.toString());
    }

    /**
     * Returns the list of all status updates received.
     */
    @GetMapping("/status/{botId}")
    public ResponseEntity<List<BotStatus>> getAllStatus(@PathVariable Integer botId) {
        return ResponseEntity.ok(commandService.getAllStatus(botId));
    }

    @GetMapping("/status/all")
    public ResponseEntity<List<BotStatus>> getStatusAll() {
        return ResponseEntity.ok(commandService.getStatusAll());
    }
}

