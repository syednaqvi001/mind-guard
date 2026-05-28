@echo off
cd /d C:\Users\syed.s.naqvi\Desktop\Challenge\mind-guard\backend
java -Dspring.datasource.url=jdbc:postgresql://localhost:5432/mindguard -Dspring.datasource.username=postgres -Dspring.datasource.password=root -Dserver.port=8081 -Dhuggingface.mock-mode=true -jar target/mindguard-1.0.0.jar
pause
