package com.example.teamprojectjgh.dao;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.teamprojectjgh.mapper.TableMapper;
import com.example.teamprojectjgh.model.Table;

@Service
public class TableService {
	
	@Autowired
	TableMapper tableMapper;


	public HashMap<String, Object> getBoardList(HashMap<String, Object> map) {
		// TODO Auto-generated method stub
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		List<Table> list = tableMapper.selectTableList(map);
	
		
		
		resultMap.put("list", list);
//		resultMap.put("cnt", cnt);
		resultMap.put("result", "success");
		
		System.out.println("프론트에 돌려주기전 resultMap에 머가 들었나~?" + resultMap);
		
		return resultMap;
	}

}
