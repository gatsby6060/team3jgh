package com.example.teamprojectjgh.mapper;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.teamprojectjgh.model.Table;

@Mapper
public interface TableMapper {
	
	List<Table> selectTableList(HashMap<String, Object> map);

}
