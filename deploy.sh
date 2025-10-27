#!/bin/bash

ssh -p 2222 s468198@se.ifmo.ru "rm -rf wildfly/wildfly-21.0.0.Final/standalone/deployments/web-lab-2.war"
scp -P 2222 ./target/web-lab-2.war s468198@se.ifmo.ru:wildfly/wildfly-21.0.0.Final/standalone/deployments