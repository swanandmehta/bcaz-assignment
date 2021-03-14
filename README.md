1.  Clone the project.
2.  Open in Intellij/eclipse.
3.  Create new configuration with Maven.
4.  Application expects below ports to be avaliable 8081 (Keycloak Server), 8082 (Frontend server), 8083 (Backend server) Can be configured using environment veriables
5.  Select "builder" as working directory and use command as "clean install".
6.  Build the project (It would take a while since it will download node and all the node modules required).
7.  We are using "keycloak-12.0.4" for OAuth. (it should be running on localhost:8081 by default you otherwise you can update environment.local.ts and application.properties for server)
8.  Import realm using "realm-export (1).json"
10. Application expects read/write access to (E://) drive to store H2 db (Can be changed from application.properties for server)
11. launch the jar from "frontend/target/" to launch UI server 
12. launch the jar from "application/target/" to launch Backend server

Application can be used by visiting http://localhost:8082

1 out of 10 times the frontend-maven-plugin does not create proper build image you will see error after visiting http://localhost:8082
in that case just try to build again it works out.


![In the action](https://user-images.githubusercontent.com/20898329/110640661-15e1bf80-81d7-11eb-89e7-84c3c9663b28.gif)
https://user-images.githubusercontent.com/20898329/110640299-aec40b00-81d6-11eb-96f8-05b466fbc517.mp4

