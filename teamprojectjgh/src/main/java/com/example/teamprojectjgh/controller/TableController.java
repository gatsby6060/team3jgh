package com.example.teamprojectjgh.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.teamprojectjgh.dao.TableService;
import com.google.gson.Gson;

import ch.qos.logback.core.model.Model;

@Controller
public class TableController {
	
	@Autowired
	TableService tableService;
	
	@RequestMapping("/sample.do")
	public String login(Model model) throws Exception {
		System.out.println("hi");
		return "default"; // .jsp빠진형태//////
	}
	
	@RequestMapping(value = "/sample-list.dox", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String bbsdelete(Model model, @RequestParam HashMap<String, Object> map) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();

		

		resultMap = tableService.getBoardList(map);

		return new Gson().toJson(resultMap);
	}

}
