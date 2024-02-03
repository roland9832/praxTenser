import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
 
import 'reactflow/dist/style.css';
 
const initialNodes = [{id: '0', position: {"x":0, "y":1200}, data: {label: '" kind : Pod , name : argocd-applicationset-controller-b57cbdbd7-f59bz , labels :[ app.kubernetes.io/name : argocd-applicationset-controller , pod-template-hash : b57cbdbd7 ]"'}}
, {id: '1', position: {"x":50, "y":1000}, data: {label: '" kind : container , name : split-brain-fix , labels :null"'}}
, {id: '2', position: {"x":100, "y":600}, data: {label: '" kind : volume , name : kube-api-access-xc847 , labels :null"'}}
, {id: '3', position: {"x":150, "y":1000}, data: {label: '" kind : ReplicaSet , name : argocd-server-65fd98d95c , labels :[ app.kubernetes.io/name : argocd-server , pod-template-hash : 65fd98d95c ]"'}}
, {id: '4', position: {"x":200, "y":600}, data: {label: '" kind : ReplicaSet , name : argocd-server-6b4b986fdf , labels :[ app.kubernetes.io/name : argocd-server , pod-template-hash : 6b4b986fdf ]"'}}
, {id: '5', position: {"x":250, "y":400}, data: {label: '" kind : ReplicaSet , name : argocd-server-77b7574484 , labels :[ app.kubernetes.io/name : argocd-server , pod-template-hash : 77b7574484 ]"'}}
, {id: '6', position: {"x":300, "y":600}, data: {label: '" kind : Endpoints , name : argocd-server , labels :[ app.kubernetes.io/name : argocd-server , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : server ]"'}}
, {id: '7', position: {"x":350, "y":400}, data: {label: '" kind : ReplicaSet , name : argocd-applicationset-controller-7fbcb78d59 , labels :[ app.kubernetes.io/name : argocd-applicationset-controller , pod-template-hash : 7fbcb78d59 ]"'}}
, {id: '8', position: {"x":400, "y":600}, data: {label: '" kind : container , name : argocd-server , labels :null"'}}
, {id: '9', position: {"x":450, "y":1200}, data: {label: '" kind : secret , name : argocd-application-controller-token-pmr4p , labels :null"'}}
, {id: '10', position: {"x":500, "y":1000}, data: {label: '" kind : ConfigMap , name : argocd-redis-ha-configmap , labels :[ app.kubernetes.io/name : argocd-redis-ha , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : redis ]"'}}
, {id: '11', position: {"x":550, "y":400}, data: {label: '" kind : volume , name : gpg-keys , labels :null"'}}
, {id: '12', position: {"x":600, "y":200}, data: {label: '" kind : ReplicaSet , name : argocd-applicationset-controller-7f78755d6f , labels :[ app.kubernetes.io/name : argocd-applicationset-controller , pod-template-hash : 7f78755d6f ]"'}}
, {id: '13', position: {"x":650, "y":800}, data: {label: '" kind : container , name : split-brain-fix , labels :null"'}}
, {id: '14', position: {"x":700, "y":1400}, data: {label: '" kind : secret , name : deployer-dockercfg-6px7w , labels :null"'}}
, {id: '15', position: {"x":750, "y":600}, data: {label: '" kind : ReplicaSet , name : argocd-redis-74c8c9c8c6 , labels :[ app.kubernetes.io/name : argocd-redis , pod-template-hash : 74c8c9c8c6 ]"'}}
, {id: '16', position: {"x":800, "y":400}, data: {label: '" kind : container , name : argocd-applicationset-controller , labels :null"'}}
, {id: '17', position: {"x":850, "y":200}, data: {label: '" kind : container , name : argocd-applicationset-controller , labels :null"'}}
, {id: '18', position: {"x":900, "y":1000}, data: {label: '" kind : container , name : avp , labels :null"'}}
, {id: '19', position: {"x":950, "y":1400}, data: {label: '" kind : ConfigMap , name : argocd-redis-ha-health-configmap , labels :[ app.kubernetes.io/name : argocd-redis-ha , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : redis ]"'}}
, {id: '20', position: {"x":1000, "y":400}, data: {label: '" kind : ReplicaSet , name : argocd-notifications-controller-585d6c6578 , labels :[ app.kubernetes.io/name : argocd-notifications-controller , pod-template-hash : 585d6c6578 ]"'}}
, {id: '21', position: {"x":1050, "y":1000}, data: {label: '" kind : Pod , name : argocd-redis-ha-server-2 , labels :[ controller-revision-hash : argocd-redis-ha-server-5f967c88db , app.kubernetes.io/name : argocd-redis-ha , statefulset.kubernetes.io/pod-name : argocd-redis-ha-server-2 ]"'}}
, {id: '22', position: {"x":1100, "y":1200}, data: {label: '" kind : container , name : haproxy , labels :null"'}}
, {id: '23', position: {"x":1150, "y":1000}, data: {label: '" kind : Pod , name : argocd-redis-ha-haproxy-559d8d9d98-hck87 , labels :[ app.kubernetes.io/name : argocd-redis-ha-haproxy , pod-template-hash : 559d8d9d98 ]"'}}
, {id: '24', position: {"x":1200, "y":400}, data: {label: '" kind : Pod , name : argocd-repo-server-c8bfd55cc-k8z56 , labels :[ app.kubernetes.io/name : argocd-repo-server , pod-template-hash : c8bfd55cc ]"'}}
, {id: '25', position: {"x":1250, "y":400}, data: {label: '" kind : container , name : redis , labels :null"'}}
, {id: '26', position: {"x":1300, "y":600}, data: {label: '" kind : container , name : argocd-notifications-controller , labels :null"'}}
, {id: '27', position: {"x":1350, "y":1200}, data: {label: '" kind : ReplicaSet , name : argocd-applicationset-controller-687f4785c9 , labels :[ app.kubernetes.io/name : argocd-applicationset-controller , pod-template-hash : 687f4785c9 ]"'}}
, {id: '28', position: {"x":1400, "y":1000}, data: {label: '" kind : configMap , name : openshift-service-ca.crt , labels :null"'}}
, {id: '29', position: {"x":1450, "y":200}, data: {label: '" kind : ConfigMap , name : argocd-gpg-keys-cm , labels :[ app.kubernetes.io/name : argocd-gpg-keys-cm , app.kubernetes.io/part-of : argocd ]"'}}
, {id: '30', position: {"x":1500, "y":800}, data: {label: '" kind : container , name : argocd-applicationset-controller , labels :null"'}}
, {id: '31', position: {"x":1550, "y":600}, data: {label: '" kind : configMap , name : argocd-redis-ha-configmap , labels :null"'}}
, {id: '32', position: {"x":1600, "y":400}, data: {label: '" kind : Service , name : argocd-redis-ha-announce-0 , labels :[ app.kubernetes.io/name : argocd-redis-ha , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : redis ]"'}}
, {id: '33', position: {"x":1650, "y":1400}, data: {label: '" kind : container , name : argocd-notifications-controller , labels :null"'}}
, {id: '34', position: {"x":1700, "y":800}, data: {label: '" kind : container , name : argocd-server , labels :null"'}}
, {id: '35', position: {"x":1750, "y":1400}, data: {label: '" kind : container , name : argocd-server , labels :null"'}}
, {id: '36', position: {"x":1800, "y":1000}, data: {label: '" kind : Service , name : argocd-redis-ha , labels :[ app.kubernetes.io/name : argocd-redis-ha , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : redis ]"'}}
, {id: '37', position: {"x":1850, "y":1400}, data: {label: '" kind : volume , name : health , labels :null"'}}
, {id: '38', position: {"x":1900, "y":600}, data: {label: '" kind : container , name : argocd-server , labels :null"'}}
, {id: '39', position: {"x":1950, "y":1000}, data: {label: '" kind : ConfigMap , name : argocd-notifications-cm , labels :[]"'}}
, {id: '40', position: {"x":2000, "y":800}, data: {label: '" kind : ReplicaSet , name : argocd-server-59ff9ddfd4 , labels :[ app.kubernetes.io/name : argocd-server , pod-template-hash : 59ff9ddfd4 ]"'}}
, {id: '41', position: {"x":2050, "y":1400}, data: {label: '" kind : volume , name : config , labels :null"'}}
, {id: '42', position: {"x":2100, "y":1200}, data: {label: '" kind : ReplicaSet , name : argocd-dex-server-75fb4d844d , labels :[ app.kubernetes.io/name : argocd-dex-server , pod-template-hash : 75fb4d844d ]"'}}
, {id: '43', position: {"x":2150, "y":1000}, data: {label: '" kind : container , name : argocd-server , labels :null"'}}
, {id: '44', position: {"x":2200, "y":1400}, data: {label: '" kind : ConfigMap , name : config-trusted-cabundle , labels :[ config.openshift.io/inject-trusted-cabundle : true , app.kubernetes.io/part-of : tekton-pipelines ]"'}}
, {id: '45', position: {"x":2250, "y":1400}, data: {label: '" kind : secret , name : argocd-dex-server-tls , labels :null"'}}
, {id: '46', position: {"x":2300, "y":1400}, data: {label: '" kind : container , name : argocd-repo-server , labels :null"'}}
, {id: '47', position: {"x":2350, "y":800}, data: {label: '" kind : Pod , name : argocd-server-6c6f49884d-5ppjs , labels :[ app.kubernetes.io/name : argocd-server , pod-template-hash : 6c6f49884d ]"'}}
, {id: '48', position: {"x":2400, "y":600}, data: {label: '" kind : Endpoints , name : argocd-redis-ha-haproxy , labels :[ app.kubernetes.io/name : argocd-redis-ha-haproxy , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : redis ]"'}}
, {id: '49', position: {"x":2450, "y":200}, data: {label: '" kind : Endpoints , name : argocd-redis-ha-announce-0 , labels :[ app.kubernetes.io/name : argocd-redis-ha , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : redis ]"'}}
, {id: '50', position: {"x":2500, "y":600}, data: {label: '" kind : volume , name : kube-api-access-mqpxv , labels :null"'}}
, {id: '51', position: {"x":2550, "y":200}, data: {label: '" kind : container , name : argocd-notifications-controller , labels :null"'}}
, {id: '52', position: {"x":2600, "y":1200}, data: {label: '" kind : secret , name : argocd-redis-ha-dockercfg-q5k4x , labels :null"'}}
, {id: '53', position: {"x":2650, "y":1400}, data: {label: '" kind : ConfigMap , name : argocd-cmd-params-cm , labels :[ app.kubernetes.io/name : argocd-cmd-params-cm , app.kubernetes.io/part-of : argocd ]"'}}
, {id: '54', position: {"x":2700, "y":800}, data: {label: '" kind : container , name : argocd-server , labels :null"'}}
, {id: '55', position: {"x":2750, "y":1000}, data: {label: '" kind : ReplicaSet , name : argocd-repo-server-7df4fb7988 , labels :[ app.kubernetes.io/name : argocd-repo-server , pod-template-hash : 7df4fb7988 ]"'}}
, {id: '56', position: {"x":2800, "y":1200}, data: {label: '" kind : secret , name : default-token-4zxs9 , labels :null"'}}
, {id: '57', position: {"x":2850, "y":800}, data: {label: '" kind : Endpoints , name : argocd-notifications-controller-metrics , labels :[ app.kubernetes.io/name : argocd-notifications-controller-metrics , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : notifications-controller ]"'}}
, {id: '58', position: {"x":2900, "y":400}, data: {label: '" kind : container , name : argocd-notifications-controller , labels :null"'}}
, {id: '59', position: {"x":2950, "y":200}, data: {label: '" kind : ConfigMap , name : argocd-rbac-cm , labels :[ app.kubernetes.io/name : argocd-rbac-cm , app.kubernetes.io/part-of : argocd ]"'}}
, {id: '60', position: {"x":3000, "y":600}, data: {label: '" kind : container , name : dex , labels :null"'}}
, {id: '61', position: {"x":3050, "y":1400}, data: {label: '" kind : secret , name : argocd-server-token-4tgbt , labels :null"'}}
, {id: '62', position: {"x":3100, "y":600}, data: {label: '" kind : volume , name : data , labels :null"'}}
, {id: '63', position: {"x":3150, "y":200}, data: {label: '" kind : NetworkPolicy , name : argocd-redis-ha-proxy-network-policy , labels :[]"'}}
, {id: '64', position: {"x":3200, "y":1200}, data: {label: '" kind : volume , name : plugins-home , labels :null"'}}
, {id: '65', position: {"x":3250, "y":400}, data: {label: '" kind : Endpoints , name : argocd-redis-ha-announce-2 , labels :[ app.kubernetes.io/name : argocd-redis-ha , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : redis ]"'}}
, {id: '66', position: {"x":3300, "y":600}, data: {label: '" kind : volume , name : kube-api-access-6n9z7 , labels :null"'}}
, {id: '67', position: {"x":3350, "y":1400}, data: {label: '" kind : ReplicaSet , name : argocd-applicationset-controller-56dfdfb585 , labels :[ app.kubernetes.io/name : argocd-applicationset-controller , pod-template-hash : 56dfdfb585 ]"'}}
, {id: '68', position: {"x":3400, "y":800}, data: {label: '" kind : container , name : redis , labels :null"'}}
, {id: '69', position: {"x":3450, "y":1400}, data: {label: '" kind : ServiceAccount , name : argocd-redis-ha-haproxy , labels :[ app.kubernetes.io/name : argocd-redis-ha-haproxy , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : redis ]"'}}
, {id: '70', position: {"x":3500, "y":400}, data: {label: '" kind : ReplicaSet , name : argocd-dex-server-b74cf6656 , labels :[ app.kubernetes.io/name : argocd-dex-server , pod-template-hash : b74cf6656 ]"'}}
, {id: '71', position: {"x":3550, "y":600}, data: {label: '" kind : volume , name : ssh-known-hosts , labels :null"'}}
, {id: '72', position: {"x":3600, "y":1400}, data: {label: '" kind : ReplicaSet , name : argocd-server-67c898c87 , labels :[ app.kubernetes.io/name : argocd-server , pod-template-hash : 67c898c87 ]"'}}
, {id: '73', position: {"x":3650, "y":200}, data: {label: '" kind : ServiceAccount , name : pipeline , labels :[]"'}}
, {id: '74', position: {"x":3700, "y":400}, data: {label: '" kind : Service , name : argocd-metrics , labels :[ app.kubernetes.io/name : argocd-metrics , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : metrics ]"'}}
, {id: '75', position: {"x":3750, "y":200}, data: {label: '" kind : volume , name : argocd-repo-server-tls , labels :null"'}}
, {id: '76', position: {"x":3800, "y":400}, data: {label: '" kind : container , name : argocd-server , labels :null"'}}
, {id: '77', position: {"x":3850, "y":600}, data: {label: '" kind : ReplicaSet , name : argocd-notifications-controller-77588bf47c , labels :[ app.kubernetes.io/name : argocd-notifications-controller , pod-template-hash : 77588bf47c ]"'}}
, {id: '78', position: {"x":3900, "y":200}, data: {label: '" kind : ConfigMap , name : cmp-plugin , labels :[]"'}}
, {id: '79', position: {"x":3950, "y":800}, data: {label: '" kind : container , name : argocd-server , labels :null"'}}
, {id: '80', position: {"x":4000, "y":1000}, data: {label: '" kind : Pod , name : argocd-application-controller-0 , labels :[ controller-revision-hash : argocd-application-controller-6d6d7c8fc9 , app.kubernetes.io/name : argocd-application-controller , statefulset.kubernetes.io/pod-name : argocd-application-controller-0 ]"'}}
, {id: '81', position: {"x":4050, "y":1200}, data: {label: '" kind : container , name : argocd-repo-server , labels :null"'}}
, {id: '82', position: {"x":4100, "y":800}, data: {label: '" kind : ServiceAccount , name : argocd-dex-server , labels :[ app.kubernetes.io/name : argocd-dex-server , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : dex-server ]"'}}
, {id: '83', position: {"x":4150, "y":1400}, data: {label: '" kind : ReplicaSet , name : argocd-dex-server-7d8548bdd5 , labels :[ app.kubernetes.io/name : argocd-dex-server , pod-template-hash : 7d8548bdd5 ]"'}}
, {id: '84', position: {"x":4200, "y":600}, data: {label: '" kind : Service , name : argocd-server-metrics , labels :[ app.kubernetes.io/name : argocd-server-metrics , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : server ]"'}}
, {id: '85', position: {"x":4250, "y":1400}, data: {label: '" kind : namespace , name : argocd , labels :null"'}}
, {id: '86', position: {"x":4300, "y":1200}, data: {label: '" kind : secret , name : argocd-repo-server-tls , labels :null"'}}
, {id: '87', position: {"x":4350, "y":400}, data: {label: '" kind : volume , name : kube-api-access-gszk5 , labels :null"'}}
, {id: '88', position: {"x":4400, "y":1000}, data: {label: '" kind : secret , name : pipeline-dockercfg-zs459 , labels :null"'}}
, {id: '89', position: {"x":4450, "y":800}, data: {label: '" kind : Deployment , name : argocd-dex-server , labels :[ app.kubernetes.io/name : argocd-dex-server , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : dex-server ]"'}}
, {id: '90', position: {"x":4500, "y":200}, data: {label: '" kind : container , name : argocd-application-controller , labels :null"'}}
, {id: '91', position: {"x":4550, "y":1400}, data: {label: '" kind : secret , name : argocd-application-controller-dockercfg-2k2mx , labels :null"'}}
, {id: '92', position: {"x":4600, "y":800}, data: {label: '" kind : NetworkPolicy , name : argocd-redis-network-policy , labels :[]"'}}
, {id: '93', position: {"x":4650, "y":200}, data: {label: '" kind : volume , name : dexconfig , labels :null"'}}
, {id: '94', position: {"x":4700, "y":1200}, data: {label: '" kind : ReplicaSet , name : argocd-applicationset-controller-cdf85bbf4 , labels :[ app.kubernetes.io/name : argocd-applicationset-controller , pod-template-hash : cdf85bbf4 ]"'}}
, {id: '95', position: {"x":4750, "y":400}, data: {label: '" kind : ReplicaSet , name : argocd-repo-server-6d8c48f77f , labels :[ app.kubernetes.io/name : argocd-repo-server , pod-template-hash : 6d8c48f77f ]"'}}
, {id: '96', position: {"x":4800, "y":1000}, data: {label: '" kind : volume , name : gpg-keyring , labels :null"'}}
, {id: '97', position: {"x":4850, "y":800}, data: {label: '" kind : Pod , name : argocd-dex-server-5c9848874c-8l5kv , labels :[ app.kubernetes.io/name : argocd-dex-server , pod-template-hash : 5c9848874c ]"'}}
, {id: '98', position: {"x":4900, "y":800}, data: {label: '" kind : ServiceAccount , name : argocd-repo-server , labels :[ app.kubernetes.io/name : argocd-repo-server , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : repo-server ]"'}}
, {id: '99', position: {"x":4950, "y":1400}, data: {label: '" kind : ReplicaSet , name : argocd-redis-547f5d94cd , labels :[ app.kubernetes.io/name : argocd-redis , pod-template-hash : 547f5d94cd ]"'}}
, {id: '100', position: {"x":5000, "y":1200}, data: {label: '" kind : Pod , name : argocd-redis-ha-server-0 , labels :[ controller-revision-hash : argocd-redis-ha-server-5f967c88db , app.kubernetes.io/name : argocd-redis-ha , statefulset.kubernetes.io/pod-name : argocd-redis-ha-server-0 ]"'}}
, {id: '101', position: {"x":5050, "y":400}, data: {label: '" kind : volume , name : plugins , labels :null"'}}
, {id: '102', position: {"x":5100, "y":1200}, data: {label: '" kind : ReplicaSet , name : argocd-applicationset-controller-75d65d85b4 , labels :[ app.kubernetes.io/name : argocd-applicationset-controller , pod-template-hash : 75d65d85b4 ]"'}}
, {id: '103', position: {"x":5150, "y":1000}, data: {label: '" kind : Service , name : argocd-notifications-controller-metrics , labels :[ app.kubernetes.io/name : argocd-notifications-controller-metrics , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : notifications-controller ]"'}}
, {id: '104', position: {"x":5200, "y":200}, data: {label: '" kind : ReplicaSet , name : argocd-dex-server-88b594955 , labels :[ app.kubernetes.io/name : argocd-dex-server , pod-template-hash : 88b594955 ]"'}}
, {id: '105', position: {"x":5250, "y":800}, data: {label: '" kind : volume , name : cmp-plugin , labels :null"'}}
, {id: '106', position: {"x":5300, "y":600}, data: {label: '" kind : container , name : dex , labels :null"'}}
, {id: '107', position: {"x":5350, "y":200}, data: {label: '" kind : ReplicaSet , name : argocd-notifications-controller-d9975fdb7 , labels :[ app.kubernetes.io/name : argocd-notifications-controller , pod-template-hash : d9975fdb7 ]"'}}
, {id: '108', position: {"x":5400, "y":600}, data: {label: '" kind : ReplicaSet , name : argocd-notifications-controller-77657944f8 , labels :[ app.kubernetes.io/name : argocd-notifications-controller , pod-template-hash : 77657944f8 ]"'}}
, {id: '109', position: {"x":5450, "y":200}, data: {label: '" kind : NetworkPolicy , name : argocd-dex-server-network-policy , labels :[]"'}}
, {id: '110', position: {"x":5500, "y":200}, data: {label: '" kind : container , name : dex , labels :null"'}}
, {id: '111', position: {"x":5550, "y":1400}, data: {label: '" kind : container , name : redis , labels :null"'}}
, {id: '112', position: {"x":5600, "y":800}, data: {label: '" kind : ReplicaSet , name : argocd-redis-ha-haproxy-8597cb4bb8 , labels :[ app.kubernetes.io/name : argocd-redis-ha-haproxy , pod-template-hash : 8597cb4bb8 ]"'}}
, {id: '113', position: {"x":5650, "y":1200}, data: {label: '" kind : ReplicaSet , name : argocd-dex-server-df74d6d86 , labels :[ app.kubernetes.io/name : argocd-dex-server , pod-template-hash : df74d6d86 ]"'}}
, {id: '114', position: {"x":5700, "y":1400}, data: {label: '" kind : secret , name : pipeline-token-mjnq4 , labels :null"'}}
, {id: '115', position: {"x":5750, "y":200}, data: {label: '" kind : Pod , name : argocd-redis-ha-server-1 , labels :[ controller-revision-hash : argocd-redis-ha-server-5f967c88db , app.kubernetes.io/name : argocd-redis-ha , statefulset.kubernetes.io/pod-name : argocd-redis-ha-server-1 ]"'}}
, {id: '116', position: {"x":5800, "y":400}, data: {label: '" kind : ServiceAccount , name : argocd-redis , labels :[ app.kubernetes.io/name : argocd-redis , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : redis ]"'}}
, {id: '117', position: {"x":5850, "y":1400}, data: {label: '" kind : container , name : redis , labels :null"'}}
, {id: '118', position: {"x":5900, "y":200}, data: {label: '" kind : secret , name : builder-token-9lbg5 , labels :null"'}}
, {id: '119', position: {"x":5950, "y":600}, data: {label: '" kind : volume , name : kube-api-access-pjvn7 , labels :null"'}}
, {id: '120', position: {"x":6000, "y":600}, data: {label: '" kind : ServiceAccount , name : argocd-notifications-controller , labels :[ app.kubernetes.io/name : argocd-notifications-controller , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : notifications-controller ]"'}}
, {id: '121', position: {"x":6050, "y":200}, data: {label: '" kind : ConfigMap , name : config-service-cabundle , labels :[ app.kubernetes.io/part-of : tekton-pipelines ]"'}}
, {id: '122', position: {"x":6100, "y":800}, data: {label: '" kind : volume , name : tmp , labels :null"'}}
, {id: '123', position: {"x":6150, "y":1200}, data: {label: '" kind : configMap , name : argocd-redis-ha-health-configmap , labels :null"'}}
, {id: '124', position: {"x":6200, "y":1000}, data: {label: '" kind : ReplicaSet , name : argocd-applicationset-controller-8d78b7cb9 , labels :[ app.kubernetes.io/name : argocd-applicationset-controller , pod-template-hash : 8d78b7cb9 ]"'}}
, {id: '125', position: {"x":6250, "y":800}, data: {label: '" kind : ReplicaSet , name : argocd-repo-server-c8bfd55cc , labels :[ app.kubernetes.io/name : argocd-repo-server , pod-template-hash : c8bfd55cc ]"'}}
, {id: '126', position: {"x":6300, "y":1000}, data: {label: '" kind : container , name : argocd-notifications-controller , labels :null"'}}
, {id: '127', position: {"x":6350, "y":200}, data: {label: '" kind : ReplicaSet , name : argocd-notifications-controller-7b4f4f9d75 , labels :[ app.kubernetes.io/name : argocd-notifications-controller , pod-template-hash : 7b4f4f9d75 ]"'}}
, {id: '128', position: {"x":6400, "y":600}, data: {label: '" kind : container , name : argocd-applicationset-controller , labels :null"'}}
, {id: '129', position: {"x":6450, "y":800}, data: {label: '" kind : container , name : argocd-applicationset-controller , labels :null"'}}
, {id: '130', position: {"x":6500, "y":1400}, data: {label: '" kind : Deployment , name : argocd-redis-ha-haproxy , labels :[ app.kubernetes.io/name : argocd-redis-ha-haproxy , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : redis ]"'}}
, {id: '131', position: {"x":6550, "y":1000}, data: {label: '" kind : secret , name : argocd-redis-ha-haproxy-dockercfg-wqk2p , labels :null"'}}
, {id: '132', position: {"x":6600, "y":1400}, data: {label: '" kind : secret , name : argocd-repo-server-dockercfg-rzmwd , labels :null"'}}
, {id: '133', position: {"x":6650, "y":400}, data: {label: '" kind : ReplicaSet , name : argocd-notifications-controller-58c959bc5b , labels :[ app.kubernetes.io/name : argocd-notifications-controller , pod-template-hash : 58c959bc5b ]"'}}
, {id: '134', position: {"x":6700, "y":1400}, data: {label: '" kind : secret , name : default-dockercfg-cr28h , labels :null"'}}
, {id: '135', position: {"x":6750, "y":600}, data: {label: '" kind : Endpoints , name : argocd-redis-ha-announce-1 , labels :[ app.kubernetes.io/name : argocd-redis-ha , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : redis ]"'}}
, {id: '136', position: {"x":6800, "y":1400}, data: {label: '" kind : container , name : argocd-notifications-controller , labels :null"'}}
, {id: '137', position: {"x":6850, "y":1000}, data: {label: '" kind : configMap , name : argocd-tls-certs-cm , labels :null"'}}
, {id: '138', position: {"x":6900, "y":200}, data: {label: '" kind : container , name : argocd-applicationset-controller , labels :null"'}}
, {id: '139', position: {"x":6950, "y":200}, data: {label: '" kind : secret , name : argocd-dex-server-token-r5n59 , labels :null"'}}
, {id: '140', position: {"x":7000, "y":400}, data: {label: '" kind : container , name : argocd-applicationset-controller , labels :null"'}}
, {id: '141', position: {"x":7050, "y":1200}, data: {label: '" kind : ServiceAccount , name : argocd-redis-ha , labels :[ app.kubernetes.io/name : argocd-redis-ha , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : redis ]"'}}
, {id: '142', position: {"x":7100, "y":1200}, data: {label: '" kind : secret , name : argocd-repo-server-token-qwm7h , labels :null"'}}
, {id: '143', position: {"x":7150, "y":800}, data: {label: '" kind : container , name : haproxy , labels :null"'}}
, {id: '144', position: {"x":7200, "y":200}, data: {label: '" kind : Endpoints , name : argocd-dex-server , labels :[ app.kubernetes.io/name : argocd-dex-server , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : dex-server ]"'}}
, {id: '145', position: {"x":7250, "y":600}, data: {label: '" kind : ReplicaSet , name : argocd-notifications-controller-5fc9bf7476 , labels :[ app.kubernetes.io/name : argocd-notifications-controller , pod-template-hash : 5fc9bf7476 ]"'}}
, {id: '146', position: {"x":7300, "y":1200}, data: {label: '" kind : volume , name : kube-api-access-sgscw , labels :null"'}}
, {id: '147', position: {"x":7350, "y":600}, data: {label: '" kind : Pod , name : argocd-repo-server-c8bfd55cc-tgnvb , labels :[ app.kubernetes.io/name : argocd-repo-server , pod-template-hash : c8bfd55cc ]"'}}
, {id: '148', position: {"x":7400, "y":600}, data: {label: '" kind : container , name : argocd-repo-server , labels :null"'}}
, {id: '149', position: {"x":7450, "y":400}, data: {label: '" kind : Endpoints , name : argocd-redis , labels :[ app.kubernetes.io/name : argocd-redis , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : redis ]"'}}
, {id: '150', position: {"x":7500, "y":800}, data: {label: '" kind : volume , name : kube-api-access-9qjnw , labels :null"'}}
, {id: '151', position: {"x":7550, "y":200}, data: {label: '" kind : Service , name : argocd-redis-ha-haproxy , labels :[ app.kubernetes.io/name : argocd-redis-ha-haproxy , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : redis ]"'}}
, {id: '152', position: {"x":7600, "y":200}, data: {label: '" kind : configMap , name : argocd-ssh-known-hosts-cm , labels :null"'}}
, {id: '153', position: {"x":7650, "y":1000}, data: {label: '" kind : Deployment , name : argocd-applicationset-controller , labels :[ app.kubernetes.io/name : argocd-applicationset-controller , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : applicationset-controller ]"'}}
, {id: '154', position: {"x":7700, "y":1000}, data: {label: '" kind : Service , name : argocd-dex-server , labels :[ app.kubernetes.io/name : argocd-dex-server , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : dex-server ]"'}}
, {id: '155', position: {"x":7750, "y":200}, data: {label: '" kind : ReplicaSet , name : argocd-redis-ha-haproxy-559d8d9d98 , labels :[ app.kubernetes.io/name : argocd-redis-ha-haproxy , pod-template-hash : 559d8d9d98 ]"'}}
, {id: '156', position: {"x":7800, "y":1000}, data: {label: '" kind : secret , name : argocd-server-dockercfg-7jss9 , labels :null"'}}
, {id: '157', position: {"x":7850, "y":200}, data: {label: '" kind : Endpoints , name : argocd-metrics , labels :[ app.kubernetes.io/name : argocd-metrics , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : metrics ]"'}}
, {id: '158', position: {"x":7900, "y":400}, data: {label: '" kind : configMap , name : cmp-plugin , labels :null"'}}
, {id: '159', position: {"x":7950, "y":800}, data: {label: '" kind : volume , name : argocd-dex-server-tls , labels :null"'}}
, {id: '160', position: {"x":8000, "y":800}, data: {label: '" kind : ConfigMap , name : openshift-service-ca.crt , labels :[]"'}}
, {id: '161', position: {"x":8050, "y":1200}, data: {label: '" kind : Pod , name : argocd-redis-ha-haproxy-559d8d9d98-q99bg , labels :[ app.kubernetes.io/name : argocd-redis-ha-haproxy , pod-template-hash : 559d8d9d98 ]"'}}
, {id: '162', position: {"x":8100, "y":400}, data: {label: '" kind : volume , name : kube-api-access-98svv , labels :null"'}}
, {id: '163', position: {"x":8150, "y":200}, data: {label: '" kind : ConfigMap , name : argocd-tls-certs-cm , labels :[ app.kubernetes.io/name : argocd-tls-certs-cm , app.kubernetes.io/part-of : argocd ]"'}}
, {id: '164', position: {"x":8200, "y":800}, data: {label: '" kind : ReplicaSet , name : argocd-repo-server-5fc5b6dcb5 , labels :[ app.kubernetes.io/name : argocd-repo-server , pod-template-hash : 5fc5b6dcb5 ]"'}}
, {id: '165', position: {"x":8250, "y":1400}, data: {label: '" kind : ReplicaSet , name : argocd-applicationset-controller-5f978d6f6 , labels :[ app.kubernetes.io/name : argocd-applicationset-controller , pod-template-hash : 5f978d6f6 ]"'}}
, {id: '166', position: {"x":8300, "y":600}, data: {label: '" kind : ReplicaSet , name : argocd-dex-server-7b54889fd5 , labels :[ app.kubernetes.io/name : argocd-dex-server , pod-template-hash : 7b54889fd5 ]"'}}
, {id: '167', position: {"x":8350, "y":1000}, data: {label: '" kind : secret , name : argocd-applicationset-controller-dockercfg-6t685 , labels :null"'}}
, {id: '168', position: {"x":8400, "y":200}, data: {label: '" kind : container , name : argocd-repo-server , labels :null"'}}
, {id: '169', position: {"x":8450, "y":1400}, data: {label: '" kind : ReplicaSet , name : argocd-notifications-controller-698544ddbf , labels :[ app.kubernetes.io/name : argocd-notifications-controller , pod-template-hash : 698544ddbf ]"'}}
, {id: '170', position: {"x":8500, "y":1400}, data: {label: '" kind : volume , name : kube-api-access-zn6rp , labels :null"'}}
, {id: '171', position: {"x":8550, "y":1000}, data: {label: '" kind : container , name : dex , labels :null"'}}
, {id: '172', position: {"x":8600, "y":600}, data: {label: '" kind : ReplicaSet , name : argocd-server-756d786b85 , labels :[ app.kubernetes.io/name : argocd-server , pod-template-hash : 756d786b85 ]"'}}
, {id: '173', position: {"x":8650, "y":600}, data: {label: '" kind : ServiceAccount , name : default , labels :[]"'}}
, {id: '174', position: {"x":8700, "y":400}, data: {label: '" kind : container , name : avp , labels :null"'}}
, {id: '175', position: {"x":8750, "y":400}, data: {label: '" kind : secret , name : argocd-redis-dockercfg-xvc68 , labels :null"'}}
, {id: '176', position: {"x":8800, "y":800}, data: {label: '" kind : Service , name : argocd-redis-ha-announce-2 , labels :[ app.kubernetes.io/name : argocd-redis-ha , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : redis ]"'}}
, {id: '177', position: {"x":8850, "y":600}, data: {label: '" kind : container , name : dex , labels :null"'}}
, {id: '178', position: {"x":8900, "y":1200}, data: {label: '" kind : volume , name : tls-certs , labels :null"'}}
, {id: '179', position: {"x":8950, "y":1000}, data: {label: '" kind : Endpoints , name : argocd-server-metrics , labels :[ app.kubernetes.io/name : argocd-server-metrics , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : server ]"'}}
, {id: '180', position: {"x":9000, "y":1000}, data: {label: '" kind : Service , name : argocd-redis-ha-announce-1 , labels :[ app.kubernetes.io/name : argocd-redis-ha , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : redis ]"'}}
, {id: '181', position: {"x":9050, "y":1400}, data: {label: '" kind : volume , name : static-files , labels :null"'}}
, {id: '182', position: {"x":9100, "y":400}, data: {label: '" kind : ReplicaSet , name : argocd-repo-server-c7cbc898b , labels :[ app.kubernetes.io/name : argocd-repo-server , pod-template-hash : c7cbc898b ]"'}}
, {id: '183', position: {"x":9150, "y":1200}, data: {label: '" kind : Endpoints , name : argocd-applicationset-controller , labels :[ app.kubernetes.io/name : argocd-applicationset-controller , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : applicationset-controller ]"'}}
, {id: '184', position: {"x":9200, "y":1200}, data: {label: '" kind : container , name : avp , labels :null"'}}
, {id: '185', position: {"x":9250, "y":400}, data: {label: '" kind : NetworkPolicy , name : argocd-application-controller-network-policy , labels :[]"'}}
, {id: '186', position: {"x":9300, "y":600}, data: {label: '" kind : NetworkPolicy , name : argocd-notifications-controller-network-policy , labels :[ app.kubernetes.io/name : argocd-notifications-controller , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : notifications-controller ]"'}}
, {id: '187', position: {"x":9350, "y":800}, data: {label: '" kind : volume , name : shared-socket , labels :null"'}}
, {id: '188', position: {"x":9400, "y":200}, data: {label: '" kind : volume , name : var-files , labels :null"'}}
, {id: '189', position: {"x":9450, "y":600}, data: {label: '" kind : container , name : argocd-applicationset-controller , labels :null"'}}
, {id: '190', position: {"x":9500, "y":600}, data: {label: '" kind : ReplicaSet , name : argocd-notifications-controller-779d757cf6 , labels :[ app.kubernetes.io/name : argocd-notifications-controller , pod-template-hash : 779d757cf6 ]"'}}
, {id: '191', position: {"x":9550, "y":200}, data: {label: '" kind : container , name : argocd-notifications-controller , labels :null"'}}
, {id: '192', position: {"x":9600, "y":400}, data: {label: '" kind : secret , name : deployer-token-49sw7 , labels :null"'}}
, {id: '193', position: {"x":9650, "y":1400}, data: {label: '" kind : volume , name : custom-tools , labels :null"'}}
, {id: '194', position: {"x":9700, "y":400}, data: {label: '" kind : secret , name : argocd-dex-server-tls , labels :null"'}}
, {id: '195', position: {"x":9750, "y":1400}, data: {label: '" kind : secret , name : argocd-applicationset-controller-token-8m26s , labels :null"'}}
, {id: '196', position: {"x":9800, "y":1000}, data: {label: '" kind : ReplicaSet , name : argocd-notifications-controller-8575c6fffc , labels :[ app.kubernetes.io/name : argocd-notifications-controller , pod-template-hash : 8575c6fffc ]"'}}
, {id: '197', position: {"x":9850, "y":1400}, data: {label: '" kind : ReplicaSet , name : argocd-repo-server-75d75f987 , labels :[ app.kubernetes.io/name : argocd-repo-server , pod-template-hash : 75d75f987 ]"'}}
, {id: '198', position: {"x":9900, "y":400}, data: {label: '" kind : container , name : argocd-application-controller , labels :null"'}}
, {id: '199', position: {"x":9950, "y":400}, data: {label: '" kind : Deployment , name : argocd-server , labels :[ app.kubernetes.io/name : argocd-server , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : server ]"'}}
, {id: '200', position: {"x":10000, "y":200}, data: {label: '" kind : ReplicaSet , name : argocd-applicationset-controller-76f66c65bd , labels :[ app.kubernetes.io/name : argocd-applicationset-controller , pod-template-hash : 76f66c65bd ]"'}}
, {id: '201', position: {"x":10050, "y":400}, data: {label: '" kind : ReplicaSet , name : argocd-dex-server-5774f796 , labels :[ app.kubernetes.io/name : argocd-dex-server , pod-template-hash : 5774f796 ]"'}}
, {id: '202', position: {"x":10100, "y":200}, data: {label: '" kind : container , name : argocd-notifications-controller , labels :null"'}}
, {id: '203', position: {"x":10150, "y":1200}, data: {label: '" kind : container , name : argocd-server , labels :null"'}}
, {id: '204', position: {"x":10200, "y":1400}, data: {label: '" kind : Pod , name : argocd-notifications-controller-77657944f8-24fmr , labels :[ app.kubernetes.io/name : argocd-notifications-controller , pod-template-hash : 77657944f8 ]"'}}
, {id: '205', position: {"x":10250, "y":600}, data: {label: '" kind : Pod , name : argocd-server-6c6f49884d-zjfxh , labels :[ app.kubernetes.io/name : argocd-server , pod-template-hash : 6c6f49884d ]"'}}
, {id: '206', position: {"x":10300, "y":400}, data: {label: '" kind : Deployment , name : argocd-notifications-controller , labels :[ app.kubernetes.io/name : argocd-notifications-controller , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : notifications-controller ]"'}}
, {id: '207', position: {"x":10350, "y":600}, data: {label: '" kind : volume , name : kube-api-access-slmjp , labels :null"'}}
, {id: '208', position: {"x":10400, "y":800}, data: {label: '" kind : ServiceAccount , name : argocd-applicationset-controller , labels :[ app.kubernetes.io/name : argocd-applicationset-controller , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : applicationset-controller ]"'}}
, {id: '209', position: {"x":10450, "y":800}, data: {label: '" kind : container , name : argocd-applicationset-controller , labels :null"'}}
, {id: '210', position: {"x":10500, "y":600}, data: {label: '" kind : container , name : argocd-repo-server , labels :null"'}}
, {id: '211', position: {"x":10550, "y":800}, data: {label: '" kind : NetworkPolicy , name : argocd-applicationset-controller-network-policy , labels :[]"'}}
, {id: '212', position: {"x":10600, "y":200}, data: {label: '" kind : ReplicaSet , name : argocd-repo-server-b8b5b6fc5 , labels :[ app.kubernetes.io/name : argocd-repo-server , pod-template-hash : b8b5b6fc5 ]"'}}
, {id: '213', position: {"x":10650, "y":1000}, data: {label: '" kind : container , name : argocd-repo-server , labels :null"'}}
, {id: '214', position: {"x":10700, "y":600}, data: {label: '" kind : ReplicaSet , name : argocd-server-657859d98 , labels :[ app.kubernetes.io/name : argocd-server , pod-template-hash : 657859d98 ]"'}}
, {id: '215', position: {"x":10750, "y":800}, data: {label: '" kind : Service , name : argocd-applicationset-controller , labels :[ app.kubernetes.io/name : argocd-applicationset-controller , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : applicationset-controller ]"'}}
, {id: '216', position: {"x":10800, "y":600}, data: {label: '" kind : volume , name : kube-api-access-wdmns , labels :null"'}}
, {id: '217', position: {"x":10850, "y":1400}, data: {label: '" kind : container , name : haproxy , labels :null"'}}
, {id: '218', position: {"x":10900, "y":1400}, data: {label: '" kind : ReplicaSet , name : argocd-redis-574f46944f , labels :[ app.kubernetes.io/name : argocd-redis , pod-template-hash : 574f46944f ]"'}}
, {id: '219', position: {"x":10950, "y":800}, data: {label: '" kind : secret , name : argocd-redis-token-47kxk , labels :null"'}}
, {id: '220', position: {"x":11000, "y":1000}, data: {label: '" kind : Deployment , name : argocd-repo-server , labels :[ app.kubernetes.io/name : argocd-repo-server , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : repo-server ]"'}}
, {id: '221', position: {"x":11050, "y":200}, data: {label: '" kind : ReplicaSet , name : argocd-redis-7b489ccf65 , labels :[ app.kubernetes.io/name : argocd-redis , pod-template-hash : 7b489ccf65 ]"'}}
, {id: '222', position: {"x":11100, "y":400}, data: {label: '" kind : NetworkPolicy , name : argocd-redis-ha-server-network-policy , labels :[]"'}}
, {id: '223', position: {"x":11150, "y":1200}, data: {label: '" kind : container , name : argocd-server , labels :null"'}}
, {id: '224', position: {"x":11200, "y":200}, data: {label: '" kind : container , name : haproxy , labels :null"'}}
, {id: '225', position: {"x":11250, "y":1200}, data: {label: '" kind : container , name : sentinel , labels :null"'}}
, {id: '226', position: {"x":11300, "y":1400}, data: {label: '" kind : container , name : dex , labels :null"'}}
, {id: '227', position: {"x":11350, "y":600}, data: {label: '" kind : ConfigMap , name : argocd-cm , labels :[ app.kubernetes.io/name : argocd-cm , app.kubernetes.io/part-of : argocd ]"'}}
, {id: '228', position: {"x":11400, "y":800}, data: {label: '" kind : container , name : argocd-notifications-controller , labels :null"'}}
, {id: '229', position: {"x":11450, "y":600}, data: {label: '" kind : secret , name : argocd-notifications-controller-token-lfjv2 , labels :null"'}}
, {id: '230', position: {"x":11500, "y":400}, data: {label: '" kind : Service , name : argocd-redis , labels :[ app.kubernetes.io/name : argocd-redis , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : redis ]"'}}
, {id: '231', position: {"x":11550, "y":800}, data: {label: '" kind : container , name : haproxy , labels :null"'}}
, {id: '232', position: {"x":11600, "y":800}, data: {label: '" kind : container , name : argocd-applicationset-controller , labels :null"'}}
, {id: '233', position: {"x":11650, "y":600}, data: {label: '" kind : ServiceAccount , name : builder , labels :[]"'}}
, {id: '234', position: {"x":11700, "y":600}, data: {label: '" kind : ReplicaSet , name : argocd-applicationset-controller-b57cbdbd7 , labels :[ app.kubernetes.io/name : argocd-applicationset-controller , pod-template-hash : b57cbdbd7 ]"'}}
, {id: '235', position: {"x":11750, "y":400}, data: {label: '" kind : volume , name : argocd-home , labels :null"'}}
, {id: '236', position: {"x":11800, "y":1400}, data: {label: '" kind : ReplicaSet , name : argocd-dex-server-6dcb7dbf , labels :[ app.kubernetes.io/name : argocd-dex-server , pod-template-hash : 6dcb7dbf ]"'}}
, {id: '237', position: {"x":11850, "y":200}, data: {label: '" kind : configMap , name : argocd-gpg-keys-cm , labels :null"'}}
, {id: '238', position: {"x":11900, "y":400}, data: {label: '" kind : ReplicaSet , name : argocd-server-5cf969ffd , labels :[ app.kubernetes.io/name : argocd-server , pod-template-hash : 5cf969ffd ]"'}}
, {id: '239', position: {"x":11950, "y":600}, data: {label: '" kind : ServiceAccount , name : argocd-server , labels :[ app.kubernetes.io/name : argocd-server , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : server ]"'}}
, {id: '240', position: {"x":12000, "y":800}, data: {label: '" kind : ReplicaSet , name : argocd-notifications-controller-ddf8cd879 , labels :[ app.kubernetes.io/name : argocd-notifications-controller , pod-template-hash : ddf8cd879 ]"'}}
, {id: '241', position: {"x":12050, "y":400}, data: {label: '" kind : NetworkPolicy , name : argocd-repo-server-network-policy , labels :[]"'}}
, {id: '242', position: {"x":12100, "y":600}, data: {label: '" kind : container , name : argocd-server , labels :null"'}}
, {id: '243', position: {"x":12150, "y":400}, data: {label: '" kind : Deployment , name : argocd-redis , labels :[ app.kubernetes.io/name : argocd-redis , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : redis ]"'}}
, {id: '244', position: {"x":12200, "y":1200}, data: {label: '" kind : ServiceAccount , name : argocd-application-controller , labels :[ app.kubernetes.io/name : argocd-application-controller , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : application-controller ]"'}}
, {id: '245', position: {"x":12250, "y":400}, data: {label: '" kind : Pod , name : argocd-redis-ha-haproxy-559d8d9d98-b729m , labels :[ app.kubernetes.io/name : argocd-redis-ha-haproxy , pod-template-hash : 559d8d9d98 ]"'}}
, {id: '246', position: {"x":12300, "y":1000}, data: {label: '" kind : StatefulSet , name : argocd-application-controller , labels :[ app.kubernetes.io/name : argocd-application-controller , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : application-controller ]"'}}
, {id: '247', position: {"x":12350, "y":1000}, data: {label: '" kind : container , name : redis , labels :null"'}}
, {id: '248', position: {"x":12400, "y":1200}, data: {label: '" kind : volume , name : helm-working-dir , labels :null"'}}
, {id: '249', position: {"x":12450, "y":1400}, data: {label: '" kind : ServiceAccount , name : deployer , labels :[]"'}}
, {id: '250', position: {"x":12500, "y":200}, data: {label: '" kind : secret , name : argocd-redis-ha-token-2x7gj , labels :null"'}}
, {id: '251', position: {"x":12550, "y":600}, data: {label: '" kind : Service , name : argocd-server , labels :[ app.kubernetes.io/name : argocd-server , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : server ]"'}}
, {id: '252', position: {"x":12600, "y":1200}, data: {label: '" kind : container , name : argocd-server , labels :null"'}}
, {id: '253', position: {"x":12650, "y":600}, data: {label: '" kind : Endpoints , name : argocd-redis-ha , labels :[ app.kubernetes.io/name : argocd-redis-ha , app.kubernetes.io/part-of : argocd , service.kubernetes.io/headless :  , app.kubernetes.io/component : redis ]"'}}
, {id: '254', position: {"x":12700, "y":600}, data: {label: '" kind : secret , name : builder-dockercfg-kzhvz , labels :null"'}}
, {id: '255', position: {"x":12750, "y":600}, data: {label: '" kind : Service , name : argocd-repo-server , labels :[ app.kubernetes.io/name : argocd-repo-server , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : repo-server ]"'}}
, {id: '256', position: {"x":12800, "y":1200}, data: {label: '" kind : ReplicaSet , name : argocd-dex-server-5c9848874c , labels :[ app.kubernetes.io/name : argocd-dex-server , pod-template-hash : 5c9848874c ]"'}}
, {id: '257', position: {"x":12850, "y":800}, data: {label: '" kind : ReplicaSet , name : argocd-dex-server-866bfbb8b5 , labels :[ app.kubernetes.io/name : argocd-dex-server , pod-template-hash : 866bfbb8b5 ]"'}}
, {id: '258', position: {"x":12900, "y":400}, data: {label: '" kind : ReplicaSet , name : argocd-server-6c6f49884d , labels :[ app.kubernetes.io/name : argocd-server , pod-template-hash : 6c6f49884d ]"'}}
, {id: '259', position: {"x":12950, "y":1200}, data: {label: '" kind : ReplicaSet , name : argocd-repo-server-588bb44d8c , labels :[ app.kubernetes.io/name : argocd-repo-server , pod-template-hash : 588bb44d8c ]"'}}
, {id: '260', position: {"x":13000, "y":600}, data: {label: '" kind : container , name : argocd-server , labels :null"'}}
, {id: '261', position: {"x":13050, "y":1000}, data: {label: '" kind : Endpoints , name : argocd-repo-server , labels :[ app.kubernetes.io/name : argocd-repo-server , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : repo-server ]"'}}
, {id: '262', position: {"x":13100, "y":800}, data: {label: '" kind : secret , name : argocd-dex-server-dockercfg-hvxr5 , labels :null"'}}
, {id: '263', position: {"x":13150, "y":1000}, data: {label: '" kind : ReplicaSet , name : argocd-dex-server-54d8f4b4c8 , labels :[ app.kubernetes.io/name : argocd-dex-server , pod-template-hash : 54d8f4b4c8 ]"'}}
, {id: '264', position: {"x":13200, "y":1000}, data: {label: '" kind : ReplicaSet , name : argocd-server-5fd55c4569 , labels :[ app.kubernetes.io/name : argocd-server , pod-template-hash : 5fd55c4569 ]"'}}
, {id: '265', position: {"x":13250, "y":200}, data: {label: '" kind : ReplicaSet , name : argocd-server-8654c89b97 , labels :[ app.kubernetes.io/name : argocd-server , pod-template-hash : 8654c89b97 ]"'}}
, {id: '266', position: {"x":13300, "y":1400}, data: {label: '" kind : NetworkPolicy , name : argocd-server-network-policy , labels :[]"'}}
, {id: '267', position: {"x":13350, "y":1400}, data: {label: '" kind : ConfigMap , name : argocd-ssh-known-hosts-cm , labels :[ app.kubernetes.io/name : argocd-ssh-known-hosts-cm , app.kubernetes.io/part-of : argocd ]"'}}
, {id: '268', position: {"x":13400, "y":400}, data: {label: '" kind : container , name : argocd-applicationset-controller , labels :null"'}}
, {id: '269', position: {"x":13450, "y":1000}, data: {label: '" kind : ReplicaSet , name : argocd-applicationset-controller-58d4b98459 , labels :[ app.kubernetes.io/name : argocd-applicationset-controller , pod-template-hash : 58d4b98459 ]"'}}
, {id: '270', position: {"x":13500, "y":800}, data: {label: '" kind : container , name : argocd-notifications-controller , labels :null"'}}
, {id: '271', position: {"x":13550, "y":1400}, data: {label: '" kind : secret , name : argocd-redis-ha-haproxy-token-ggbpd , labels :null"'}}
, {id: '272', position: {"x":13600, "y":1200}, data: {label: '" kind : StatefulSet , name : argocd-redis-ha-server , labels :[ app.kubernetes.io/name : argocd-redis-ha , app.kubernetes.io/part-of : argocd , app.kubernetes.io/component : redis ]"'}}
, {id: '273', position: {"x":13650, "y":400}, data: {label: '" kind : secret , name : argocd-notifications-controller-dockercfg-xdcwb , labels :null"'}}
, {id: '274', position: {"x":13700, "y":600}, data: {label: '" kind : volume , name : config-volume , labels :null"'}}
, {id: '275', position: {"x":13750, "y":1000}, data: {label: '" kind : container , name : sentinel , labels :null"'}}
, {id: '276', position: {"x":13800, "y":800}, data: {label: '" kind : ConfigMap , name : kube-root-ca.crt , labels :[]"'}}
, 
];
const initialEdges = [{id: '85-183',source: '85',target: '183'}
, {id: '85-144',source: '85',target: '144'}
, {id: '85-157',source: '85',target: '157'}
, {id: '85-57',source: '85',target: '57'}
, {id: '85-149',source: '85',target: '149'}
, {id: '85-253',source: '85',target: '253'}
, {id: '85-49',source: '85',target: '49'}
, {id: '85-135',source: '85',target: '135'}
, {id: '85-65',source: '85',target: '65'}
, {id: '85-48',source: '85',target: '48'}
, {id: '85-261',source: '85',target: '261'}
, {id: '85-6',source: '85',target: '6'}
, {id: '85-179',source: '85',target: '179'}
, {id: '85-215',source: '85',target: '215'}
, {id: '85-154',source: '85',target: '154'}
, {id: '85-74',source: '85',target: '74'}
, {id: '85-103',source: '85',target: '103'}
, {id: '85-230',source: '85',target: '230'}
, {id: '85-36',source: '85',target: '36'}
, {id: '85-32',source: '85',target: '32'}
, {id: '85-180',source: '85',target: '180'}
, {id: '85-176',source: '85',target: '176'}
, {id: '85-151',source: '85',target: '151'}
, {id: '85-255',source: '85',target: '255'}
, {id: '85-251',source: '85',target: '251'}
, {id: '85-84',source: '85',target: '84'}
, {id: '85-227',source: '85',target: '227'}
, {id: '85-53',source: '85',target: '53'}
, {id: '85-29',source: '85',target: '29'}
, {id: '85-39',source: '85',target: '39'}
, {id: '85-59',source: '85',target: '59'}
, {id: '85-10',source: '85',target: '10'}
, {id: '85-19',source: '85',target: '19'}
, {id: '85-267',source: '85',target: '267'}
, {id: '85-163',source: '85',target: '163'}
, {id: '85-78',source: '85',target: '78'}
, {id: '85-121',source: '85',target: '121'}
, {id: '85-44',source: '85',target: '44'}
, {id: '85-276',source: '85',target: '276'}
, {id: '85-160',source: '85',target: '160'}
, {id: '85-185',source: '85',target: '185'}
, {id: '85-211',source: '85',target: '211'}
, {id: '85-109',source: '85',target: '109'}
, {id: '85-186',source: '85',target: '186'}
, {id: '85-63',source: '85',target: '63'}
, {id: '85-222',source: '85',target: '222'}
, {id: '85-92',source: '85',target: '92'}
, {id: '85-241',source: '85',target: '241'}
, {id: '85-266',source: '85',target: '266'}
, {id: '16-153',source: '16',target: '153'}
, {id: '178-153',source: '178',target: '153'}
, {id: '11-153',source: '11',target: '153'}
, {id: '71-153',source: '71',target: '153'}
, {id: '122-153',source: '122',target: '153'}
, {id: '96-153',source: '96',target: '153'}
, {id: '75-153',source: '75',target: '153'}
, {id: '152-71',source: '152',target: '71'}
, {id: '137-178',source: '137',target: '178'}
, {id: '237-11',source: '237',target: '11'}
, {id: '86-75',source: '86',target: '75'}
, {id: '85-153',source: '85',target: '153'}
, {id: '110-89',source: '110',target: '89'}
, {id: '93-89',source: '93',target: '89'}
, {id: '181-89',source: '181',target: '89'}
, {id: '159-89',source: '159',target: '89'}
, {id: '194-159',source: '194',target: '159'}
, {id: '85-89',source: '85',target: '89'}
, {id: '26-206',source: '26',target: '206'}
, {id: '178-206',source: '178',target: '206'}
, {id: '75-206',source: '75',target: '206'}
, {id: '85-206',source: '85',target: '206'}
, {id: '68-243',source: '68',target: '243'}
, {id: '85-243',source: '85',target: '243'}
, {id: '217-130',source: '217',target: '130'}
, {id: '62-130',source: '62',target: '130'}
, {id: '274-130',source: '274',target: '130'}
, {id: '187-130',source: '187',target: '130'}
, {id: '31-274',source: '31',target: '274'}
, {id: '85-130',source: '85',target: '130'}
, {id: '210-220',source: '210',target: '220'}
, {id: '184-220',source: '184',target: '220'}
, {id: '101-220',source: '101',target: '220'}
, {id: '178-220',source: '178',target: '220'}
, {id: '11-220',source: '11',target: '220'}
, {id: '71-220',source: '71',target: '220'}
, {id: '248-220',source: '248',target: '220'}
, {id: '188-220',source: '188',target: '220'}
, {id: '105-220',source: '105',target: '220'}
, {id: '122-220',source: '122',target: '220'}
, {id: '96-220',source: '96',target: '220'}
, {id: '75-220',source: '75',target: '220'}
, {id: '193-220',source: '193',target: '220'}
, {id: '158-105',source: '158',target: '105'}
, {id: '85-220',source: '85',target: '220'}
, {id: '54-199',source: '54',target: '199'}
, {id: '64-199',source: '64',target: '199'}
, {id: '178-199',source: '178',target: '199'}
, {id: '71-199',source: '71',target: '199'}
, {id: '122-199',source: '122',target: '199'}
, {id: '159-199',source: '159',target: '199'}
, {id: '75-199',source: '75',target: '199'}
, {id: '45-159',source: '45',target: '159'}
, {id: '85-199',source: '85',target: '199'}
, {id: '90-246',source: '90',target: '246'}
, {id: '235-246',source: '235',target: '246'}
, {id: '75-246',source: '75',target: '246'}
, {id: '85-246',source: '85',target: '246'}
, {id: '1-272',source: '1',target: '272'}
, {id: '111-272',source: '111',target: '272'}
, {id: '275-272',source: '275',target: '272'}
, {id: '62-272',source: '62',target: '272'}
, {id: '41-272',source: '41',target: '272'}
, {id: '37-272',source: '37',target: '272'}
, {id: '31-41',source: '31',target: '41'}
, {id: '123-37',source: '123',target: '37'}
, {id: '85-272',source: '85',target: '272'}
, {id: '268-67',source: '268',target: '67'}
, {id: '178-67',source: '178',target: '67'}
, {id: '11-67',source: '11',target: '67'}
, {id: '71-67',source: '71',target: '67'}
, {id: '122-67',source: '122',target: '67'}
, {id: '96-67',source: '96',target: '67'}
, {id: '85-67',source: '85',target: '67'}
, {id: '17-269',source: '17',target: '269'}
, {id: '178-269',source: '178',target: '269'}
, {id: '11-269',source: '11',target: '269'}
, {id: '71-269',source: '71',target: '269'}
, {id: '122-269',source: '122',target: '269'}
, {id: '96-269',source: '96',target: '269'}
, {id: '85-269',source: '85',target: '269'}
, {id: '268-165',source: '268',target: '165'}
, {id: '178-165',source: '178',target: '165'}
, {id: '11-165',source: '11',target: '165'}
, {id: '71-165',source: '71',target: '165'}
, {id: '122-165',source: '122',target: '165'}
, {id: '96-165',source: '96',target: '165'}
, {id: '85-165',source: '85',target: '165'}
, {id: '209-27',source: '209',target: '27'}
, {id: '178-27',source: '178',target: '27'}
, {id: '11-27',source: '11',target: '27'}
, {id: '71-27',source: '71',target: '27'}
, {id: '122-27',source: '122',target: '27'}
, {id: '96-27',source: '96',target: '27'}
, {id: '75-27',source: '75',target: '27'}
, {id: '85-27',source: '85',target: '27'}
, {id: '232-102',source: '232',target: '102'}
, {id: '178-102',source: '178',target: '102'}
, {id: '11-102',source: '11',target: '102'}
, {id: '71-102',source: '71',target: '102'}
, {id: '122-102',source: '122',target: '102'}
, {id: '96-102',source: '96',target: '102'}
, {id: '75-102',source: '75',target: '102'}
, {id: '85-102',source: '85',target: '102'}
, {id: '129-200',source: '129',target: '200'}
, {id: '178-200',source: '178',target: '200'}
, {id: '11-200',source: '11',target: '200'}
, {id: '71-200',source: '71',target: '200'}
, {id: '122-200',source: '122',target: '200'}
, {id: '96-200',source: '96',target: '200'}
, {id: '85-200',source: '85',target: '200'}
, {id: '189-12',source: '189',target: '12'}
, {id: '178-12',source: '178',target: '12'}
, {id: '11-12',source: '11',target: '12'}
, {id: '71-12',source: '71',target: '12'}
, {id: '122-12',source: '122',target: '12'}
, {id: '96-12',source: '96',target: '12'}
, {id: '85-12',source: '85',target: '12'}
, {id: '140-7',source: '140',target: '7'}
, {id: '178-7',source: '178',target: '7'}
, {id: '11-7',source: '11',target: '7'}
, {id: '71-7',source: '71',target: '7'}
, {id: '122-7',source: '122',target: '7'}
, {id: '96-7',source: '96',target: '7'}
, {id: '85-7',source: '85',target: '7'}
, {id: '128-124',source: '128',target: '124'}
, {id: '178-124',source: '178',target: '124'}
, {id: '11-124',source: '11',target: '124'}
, {id: '71-124',source: '71',target: '124'}
, {id: '122-124',source: '122',target: '124'}
, {id: '96-124',source: '96',target: '124'}
, {id: '85-124',source: '85',target: '124'}
, {id: '16-234',source: '16',target: '234'}
, {id: '178-234',source: '178',target: '234'}
, {id: '11-234',source: '11',target: '234'}
, {id: '71-234',source: '71',target: '234'}
, {id: '122-234',source: '122',target: '234'}
, {id: '96-234',source: '96',target: '234'}
, {id: '75-234',source: '75',target: '234'}
, {id: '85-234',source: '85',target: '234'}
, {id: '30-94',source: '30',target: '94'}
, {id: '178-94',source: '178',target: '94'}
, {id: '11-94',source: '11',target: '94'}
, {id: '71-94',source: '71',target: '94'}
, {id: '122-94',source: '122',target: '94'}
, {id: '96-94',source: '96',target: '94'}
, {id: '75-94',source: '75',target: '94'}
, {id: '85-94',source: '85',target: '94'}
, {id: '110-263',source: '110',target: '263'}
, {id: '93-263',source: '93',target: '263'}
, {id: '181-263',source: '181',target: '263'}
, {id: '159-263',source: '159',target: '263'}
, {id: '85-263',source: '85',target: '263'}
, {id: '60-201',source: '60',target: '201'}
, {id: '93-201',source: '93',target: '201'}
, {id: '181-201',source: '181',target: '201'}
, {id: '159-201',source: '159',target: '201'}
, {id: '85-201',source: '85',target: '201'}
, {id: '110-256',source: '110',target: '256'}
, {id: '93-256',source: '93',target: '256'}
, {id: '181-256',source: '181',target: '256'}
, {id: '159-256',source: '159',target: '256'}
, {id: '85-256',source: '85',target: '256'}
, {id: '106-236',source: '106',target: '236'}
, {id: '93-236',source: '93',target: '236'}
, {id: '181-236',source: '181',target: '236'}
, {id: '159-236',source: '159',target: '236'}
, {id: '85-236',source: '85',target: '236'}
, {id: '226-42',source: '226',target: '42'}
, {id: '93-42',source: '93',target: '42'}
, {id: '181-42',source: '181',target: '42'}
, {id: '159-42',source: '159',target: '42'}
, {id: '85-42',source: '85',target: '42'}
, {id: '60-166',source: '60',target: '166'}
, {id: '93-166',source: '93',target: '166'}
, {id: '181-166',source: '181',target: '166'}
, {id: '159-166',source: '159',target: '166'}
, {id: '85-166',source: '85',target: '166'}
, {id: '110-83',source: '110',target: '83'}
, {id: '93-83',source: '93',target: '83'}
, {id: '181-83',source: '181',target: '83'}
, {id: '159-83',source: '159',target: '83'}
, {id: '85-83',source: '85',target: '83'}
, {id: '171-257',source: '171',target: '257'}
, {id: '93-257',source: '93',target: '257'}
, {id: '181-257',source: '181',target: '257'}
, {id: '159-257',source: '159',target: '257'}
, {id: '85-257',source: '85',target: '257'}
, {id: '60-104',source: '60',target: '104'}
, {id: '93-104',source: '93',target: '104'}
, {id: '181-104',source: '181',target: '104'}
, {id: '159-104',source: '159',target: '104'}
, {id: '85-104',source: '85',target: '104'}
, {id: '110-70',source: '110',target: '70'}
, {id: '93-70',source: '93',target: '70'}
, {id: '181-70',source: '181',target: '70'}
, {id: '159-70',source: '159',target: '70'}
, {id: '85-70',source: '85',target: '70'}
, {id: '110-113',source: '110',target: '113'}
, {id: '93-113',source: '93',target: '113'}
, {id: '181-113',source: '181',target: '113'}
, {id: '159-113',source: '159',target: '113'}
, {id: '85-113',source: '85',target: '113'}
, {id: '270-20',source: '270',target: '20'}
, {id: '178-20',source: '178',target: '20'}
, {id: '75-20',source: '75',target: '20'}
, {id: '85-20',source: '85',target: '20'}
, {id: '136-133',source: '136',target: '133'}
, {id: '178-133',source: '178',target: '133'}
, {id: '75-133',source: '75',target: '133'}
, {id: '85-133',source: '85',target: '133'}
, {id: '228-145',source: '228',target: '145'}
, {id: '178-145',source: '178',target: '145'}
, {id: '75-145',source: '75',target: '145'}
, {id: '85-145',source: '85',target: '145'}
, {id: '58-169',source: '58',target: '169'}
, {id: '178-169',source: '178',target: '169'}
, {id: '75-169',source: '75',target: '169'}
, {id: '85-169',source: '85',target: '169'}
, {id: '270-77',source: '270',target: '77'}
, {id: '178-77',source: '178',target: '77'}
, {id: '75-77',source: '75',target: '77'}
, {id: '85-77',source: '85',target: '77'}
, {id: '26-108',source: '26',target: '108'}
, {id: '178-108',source: '178',target: '108'}
, {id: '75-108',source: '75',target: '108'}
, {id: '85-108',source: '85',target: '108'}
, {id: '202-190',source: '202',target: '190'}
, {id: '178-190',source: '178',target: '190'}
, {id: '75-190',source: '75',target: '190'}
, {id: '85-190',source: '85',target: '190'}
, {id: '51-127',source: '51',target: '127'}
, {id: '178-127',source: '178',target: '127'}
, {id: '75-127',source: '75',target: '127'}
, {id: '85-127',source: '85',target: '127'}
, {id: '270-196',source: '270',target: '196'}
, {id: '178-196',source: '178',target: '196'}
, {id: '75-196',source: '75',target: '196'}
, {id: '85-196',source: '85',target: '196'}
, {id: '33-107',source: '33',target: '107'}
, {id: '178-107',source: '178',target: '107'}
, {id: '75-107',source: '75',target: '107'}
, {id: '85-107',source: '85',target: '107'}
, {id: '126-240',source: '126',target: '240'}
, {id: '178-240',source: '178',target: '240'}
, {id: '75-240',source: '75',target: '240'}
, {id: '85-240',source: '85',target: '240'}
, {id: '117-99',source: '117',target: '99'}
, {id: '85-99',source: '85',target: '99'}
, {id: '117-218',source: '117',target: '218'}
, {id: '85-218',source: '85',target: '218'}
, {id: '247-15',source: '247',target: '15'}
, {id: '85-15',source: '85',target: '15'}
, {id: '68-221',source: '68',target: '221'}
, {id: '85-221',source: '85',target: '221'}
, {id: '217-155',source: '217',target: '155'}
, {id: '62-155',source: '62',target: '155'}
, {id: '274-155',source: '274',target: '155'}
, {id: '187-155',source: '187',target: '155'}
, {id: '85-155',source: '85',target: '155'}
, {id: '224-112',source: '224',target: '112'}
, {id: '62-112',source: '62',target: '112'}
, {id: '274-112',source: '274',target: '112'}
, {id: '187-112',source: '187',target: '112'}
, {id: '85-112',source: '85',target: '112'}
, {id: '148-259',source: '148',target: '259'}
, {id: '184-259',source: '184',target: '259'}
, {id: '101-259',source: '101',target: '259'}
, {id: '178-259',source: '178',target: '259'}
, {id: '11-259',source: '11',target: '259'}
, {id: '71-259',source: '71',target: '259'}
, {id: '248-259',source: '248',target: '259'}
, {id: '188-259',source: '188',target: '259'}
, {id: '105-259',source: '105',target: '259'}
, {id: '122-259',source: '122',target: '259'}
, {id: '96-259',source: '96',target: '259'}
, {id: '75-259',source: '75',target: '259'}
, {id: '193-259',source: '193',target: '259'}
, {id: '85-259',source: '85',target: '259'}
, {id: '213-164',source: '213',target: '164'}
, {id: '184-164',source: '184',target: '164'}
, {id: '101-164',source: '101',target: '164'}
, {id: '178-164',source: '178',target: '164'}
, {id: '11-164',source: '11',target: '164'}
, {id: '71-164',source: '71',target: '164'}
, {id: '248-164',source: '248',target: '164'}
, {id: '188-164',source: '188',target: '164'}
, {id: '105-164',source: '105',target: '164'}
, {id: '122-164',source: '122',target: '164'}
, {id: '96-164',source: '96',target: '164'}
, {id: '75-164',source: '75',target: '164'}
, {id: '193-164',source: '193',target: '164'}
, {id: '85-164',source: '85',target: '164'}
, {id: '213-95',source: '213',target: '95'}
, {id: '101-95',source: '101',target: '95'}
, {id: '178-95',source: '178',target: '95'}
, {id: '11-95',source: '11',target: '95'}
, {id: '71-95',source: '71',target: '95'}
, {id: '248-95',source: '248',target: '95'}
, {id: '188-95',source: '188',target: '95'}
, {id: '122-95',source: '122',target: '95'}
, {id: '96-95',source: '96',target: '95'}
, {id: '75-95',source: '75',target: '95'}
, {id: '85-95',source: '85',target: '95'}
, {id: '148-197',source: '148',target: '197'}
, {id: '101-197',source: '101',target: '197'}
, {id: '178-197',source: '178',target: '197'}
, {id: '11-197',source: '11',target: '197'}
, {id: '71-197',source: '71',target: '197'}
, {id: '248-197',source: '248',target: '197'}
, {id: '188-197',source: '188',target: '197'}
, {id: '122-197',source: '122',target: '197'}
, {id: '96-197',source: '96',target: '197'}
, {id: '75-197',source: '75',target: '197'}
, {id: '85-197',source: '85',target: '197'}
, {id: '168-55',source: '168',target: '55'}
, {id: '184-55',source: '184',target: '55'}
, {id: '101-55',source: '101',target: '55'}
, {id: '178-55',source: '178',target: '55'}
, {id: '11-55',source: '11',target: '55'}
, {id: '71-55',source: '71',target: '55'}
, {id: '248-55',source: '248',target: '55'}
, {id: '188-55',source: '188',target: '55'}
, {id: '105-55',source: '105',target: '55'}
, {id: '122-55',source: '122',target: '55'}
, {id: '96-55',source: '96',target: '55'}
, {id: '75-55',source: '75',target: '55'}
, {id: '193-55',source: '193',target: '55'}
, {id: '85-55',source: '85',target: '55'}
, {id: '210-212',source: '210',target: '212'}
, {id: '101-212',source: '101',target: '212'}
, {id: '178-212',source: '178',target: '212'}
, {id: '11-212',source: '11',target: '212'}
, {id: '71-212',source: '71',target: '212'}
, {id: '248-212',source: '248',target: '212'}
, {id: '188-212',source: '188',target: '212'}
, {id: '122-212',source: '122',target: '212'}
, {id: '96-212',source: '96',target: '212'}
, {id: '75-212',source: '75',target: '212'}
, {id: '85-212',source: '85',target: '212'}
, {id: '168-182',source: '168',target: '182'}
, {id: '101-182',source: '101',target: '182'}
, {id: '178-182',source: '178',target: '182'}
, {id: '11-182',source: '11',target: '182'}
, {id: '71-182',source: '71',target: '182'}
, {id: '248-182',source: '248',target: '182'}
, {id: '188-182',source: '188',target: '182'}
, {id: '122-182',source: '122',target: '182'}
, {id: '96-182',source: '96',target: '182'}
, {id: '75-182',source: '75',target: '182'}
, {id: '85-182',source: '85',target: '182'}
, {id: '210-125',source: '210',target: '125'}
, {id: '184-125',source: '184',target: '125'}
, {id: '101-125',source: '101',target: '125'}
, {id: '178-125',source: '178',target: '125'}
, {id: '11-125',source: '11',target: '125'}
, {id: '71-125',source: '71',target: '125'}
, {id: '248-125',source: '248',target: '125'}
, {id: '188-125',source: '188',target: '125'}
, {id: '105-125',source: '105',target: '125'}
, {id: '122-125',source: '122',target: '125'}
, {id: '96-125',source: '96',target: '125'}
, {id: '75-125',source: '75',target: '125'}
, {id: '193-125',source: '193',target: '125'}
, {id: '85-125',source: '85',target: '125'}
, {id: '34-40',source: '34',target: '40'}
, {id: '64-40',source: '64',target: '40'}
, {id: '178-40',source: '178',target: '40'}
, {id: '71-40',source: '71',target: '40'}
, {id: '122-40',source: '122',target: '40'}
, {id: '159-40',source: '159',target: '40'}
, {id: '75-40',source: '75',target: '40'}
, {id: '85-40',source: '85',target: '40'}
, {id: '35-238',source: '35',target: '238'}
, {id: '64-238',source: '64',target: '238'}
, {id: '178-238',source: '178',target: '238'}
, {id: '71-238',source: '71',target: '238'}
, {id: '122-238',source: '122',target: '238'}
, {id: '159-238',source: '159',target: '238'}
, {id: '75-238',source: '75',target: '238'}
, {id: '85-238',source: '85',target: '238'}
, {id: '252-264',source: '252',target: '264'}
, {id: '64-264',source: '64',target: '264'}
, {id: '178-264',source: '178',target: '264'}
, {id: '71-264',source: '71',target: '264'}
, {id: '122-264',source: '122',target: '264'}
, {id: '159-264',source: '159',target: '264'}
, {id: '75-264',source: '75',target: '264'}
, {id: '85-264',source: '85',target: '264'}
, {id: '43-214',source: '43',target: '214'}
, {id: '64-214',source: '64',target: '214'}
, {id: '178-214',source: '178',target: '214'}
, {id: '71-214',source: '71',target: '214'}
, {id: '122-214',source: '122',target: '214'}
, {id: '159-214',source: '159',target: '214'}
, {id: '75-214',source: '75',target: '214'}
, {id: '85-214',source: '85',target: '214'}
, {id: '223-3',source: '223',target: '3'}
, {id: '64-3',source: '64',target: '3'}
, {id: '178-3',source: '178',target: '3'}
, {id: '71-3',source: '71',target: '3'}
, {id: '122-3',source: '122',target: '3'}
, {id: '159-3',source: '159',target: '3'}
, {id: '75-3',source: '75',target: '3'}
, {id: '85-3',source: '85',target: '3'}
, {id: '79-72',source: '79',target: '72'}
, {id: '64-72',source: '64',target: '72'}
, {id: '178-72',source: '178',target: '72'}
, {id: '71-72',source: '71',target: '72'}
, {id: '122-72',source: '122',target: '72'}
, {id: '159-72',source: '159',target: '72'}
, {id: '75-72',source: '75',target: '72'}
, {id: '85-72',source: '85',target: '72'}
, {id: '203-4',source: '203',target: '4'}
, {id: '64-4',source: '64',target: '4'}
, {id: '178-4',source: '178',target: '4'}
, {id: '71-4',source: '71',target: '4'}
, {id: '122-4',source: '122',target: '4'}
, {id: '159-4',source: '159',target: '4'}
, {id: '75-4',source: '75',target: '4'}
, {id: '85-4',source: '85',target: '4'}
, {id: '54-258',source: '54',target: '258'}
, {id: '64-258',source: '64',target: '258'}
, {id: '178-258',source: '178',target: '258'}
, {id: '71-258',source: '71',target: '258'}
, {id: '122-258',source: '122',target: '258'}
, {id: '159-258',source: '159',target: '258'}
, {id: '75-258',source: '75',target: '258'}
, {id: '85-258',source: '85',target: '258'}
, {id: '76-172',source: '76',target: '172'}
, {id: '64-172',source: '64',target: '172'}
, {id: '178-172',source: '178',target: '172'}
, {id: '71-172',source: '71',target: '172'}
, {id: '122-172',source: '122',target: '172'}
, {id: '159-172',source: '159',target: '172'}
, {id: '75-172',source: '75',target: '172'}
, {id: '85-172',source: '85',target: '172'}
, {id: '38-5',source: '38',target: '5'}
, {id: '64-5',source: '64',target: '5'}
, {id: '178-5',source: '178',target: '5'}
, {id: '71-5',source: '71',target: '5'}
, {id: '122-5',source: '122',target: '5'}
, {id: '159-5',source: '159',target: '5'}
, {id: '75-5',source: '75',target: '5'}
, {id: '85-5',source: '85',target: '5'}
, {id: '260-265',source: '260',target: '265'}
, {id: '64-265',source: '64',target: '265'}
, {id: '178-265',source: '178',target: '265'}
, {id: '71-265',source: '71',target: '265'}
, {id: '122-265',source: '122',target: '265'}
, {id: '159-265',source: '159',target: '265'}
, {id: '75-265',source: '75',target: '265'}
, {id: '85-265',source: '85',target: '265'}
, {id: '198-80',source: '198',target: '80'}
, {id: '235-80',source: '235',target: '80'}
, {id: '216-80',source: '216',target: '80'}
, {id: '75-80',source: '75',target: '80'}
, {id: '85-80',source: '85',target: '80'}
, {id: '138-0',source: '138',target: '0'}
, {id: '178-0',source: '178',target: '0'}
, {id: '11-0',source: '11',target: '0'}
, {id: '50-0',source: '50',target: '0'}
, {id: '71-0',source: '71',target: '0'}
, {id: '122-0',source: '122',target: '0'}
, {id: '96-0',source: '96',target: '0'}
, {id: '75-0',source: '75',target: '0'}
, {id: '85-0',source: '85',target: '0'}
, {id: '177-97',source: '177',target: '97'}
, {id: '93-97',source: '93',target: '97'}
, {id: '181-97',source: '181',target: '97'}
, {id: '159-97',source: '159',target: '97'}
, {id: '207-97',source: '207',target: '97'}
, {id: '28-207',source: '28',target: '207'}
, {id: '85-97',source: '85',target: '97'}
, {id: '191-204',source: '191',target: '204'}
, {id: '178-204',source: '178',target: '204'}
, {id: '66-204',source: '66',target: '204'}
, {id: '75-204',source: '75',target: '204'}
, {id: '85-204',source: '85',target: '204'}
, {id: '22-245',source: '22',target: '245'}
, {id: '62-245',source: '62',target: '245'}
, {id: '119-245',source: '119',target: '245'}
, {id: '274-245',source: '274',target: '245'}
, {id: '187-245',source: '187',target: '245'}
, {id: '28-119',source: '28',target: '119'}
, {id: '85-245',source: '85',target: '245'}
, {id: '231-23',source: '231',target: '23'}
, {id: '62-23',source: '62',target: '23'}
, {id: '274-23',source: '274',target: '23'}
, {id: '187-23',source: '187',target: '23'}
, {id: '146-23',source: '146',target: '23'}
, {id: '28-146',source: '28',target: '146'}
, {id: '85-23',source: '85',target: '23'}
, {id: '143-161',source: '143',target: '161'}
, {id: '62-161',source: '62',target: '161'}
, {id: '2-161',source: '2',target: '161'}
, {id: '274-161',source: '274',target: '161'}
, {id: '187-161',source: '187',target: '161'}
, {id: '28-2',source: '28',target: '2'}
, {id: '85-161',source: '85',target: '161'}
, {id: '225-100',source: '225',target: '100'}
, {id: '25-100',source: '25',target: '100'}
, {id: '13-100',source: '13',target: '100'}
, {id: '62-100',source: '62',target: '100'}
, {id: '41-100',source: '41',target: '100'}
, {id: '37-100',source: '37',target: '100'}
, {id: '85-100',source: '85',target: '100'}
, {id: '225-115',source: '225',target: '115'}
, {id: '25-115',source: '25',target: '115'}
, {id: '13-115',source: '13',target: '115'}
, {id: '62-115',source: '62',target: '115'}
, {id: '41-115',source: '41',target: '115'}
, {id: '37-115',source: '37',target: '115'}
, {id: '85-115',source: '85',target: '115'}
, {id: '225-21',source: '225',target: '21'}
, {id: '25-21',source: '25',target: '21'}
, {id: '13-21',source: '13',target: '21'}
, {id: '62-21',source: '62',target: '21'}
, {id: '41-21',source: '41',target: '21'}
, {id: '37-21',source: '37',target: '21'}
, {id: '85-21',source: '85',target: '21'}
, {id: '18-24',source: '18',target: '24'}
, {id: '46-24',source: '46',target: '24'}
, {id: '101-24',source: '101',target: '24'}
, {id: '178-24',source: '178',target: '24'}
, {id: '11-24',source: '11',target: '24'}
, {id: '71-24',source: '71',target: '24'}
, {id: '248-24',source: '248',target: '24'}
, {id: '188-24',source: '188',target: '24'}
, {id: '105-24',source: '105',target: '24'}
, {id: '122-24',source: '122',target: '24'}
, {id: '96-24',source: '96',target: '24'}
, {id: '162-24',source: '162',target: '24'}
, {id: '75-24',source: '75',target: '24'}
, {id: '193-24',source: '193',target: '24'}
, {id: '85-24',source: '85',target: '24'}
, {id: '174-147',source: '174',target: '147'}
, {id: '81-147',source: '81',target: '147'}
, {id: '101-147',source: '101',target: '147'}
, {id: '178-147',source: '178',target: '147'}
, {id: '11-147',source: '11',target: '147'}
, {id: '71-147',source: '71',target: '147'}
, {id: '248-147',source: '248',target: '147'}
, {id: '188-147',source: '188',target: '147'}
, {id: '105-147',source: '105',target: '147'}
, {id: '122-147',source: '122',target: '147'}
, {id: '170-147',source: '170',target: '147'}
, {id: '96-147',source: '96',target: '147'}
, {id: '75-147',source: '75',target: '147'}
, {id: '193-147',source: '193',target: '147'}
, {id: '85-147',source: '85',target: '147'}
, {id: '242-47',source: '242',target: '47'}
, {id: '64-47',source: '64',target: '47'}
, {id: '178-47',source: '178',target: '47'}
, {id: '71-47',source: '71',target: '47'}
, {id: '122-47',source: '122',target: '47'}
, {id: '159-47',source: '159',target: '47'}
, {id: '75-47',source: '75',target: '47'}
, {id: '87-47',source: '87',target: '47'}
, {id: '85-47',source: '85',target: '47'}
, {id: '8-205',source: '8',target: '205'}
, {id: '64-205',source: '64',target: '205'}
, {id: '150-205',source: '150',target: '205'}
, {id: '178-205',source: '178',target: '205'}
, {id: '71-205',source: '71',target: '205'}
, {id: '122-205',source: '122',target: '205'}
, {id: '159-205',source: '159',target: '205'}
, {id: '75-205',source: '75',target: '205'}
, {id: '85-205',source: '85',target: '205'}
, {id: '9-244',source: '9',target: '244'}
, {id: '91-244',source: '91',target: '244'}
, {id: '85-244',source: '85',target: '244'}
, {id: '195-208',source: '195',target: '208'}
, {id: '167-208',source: '167',target: '208'}
, {id: '85-208',source: '85',target: '208'}
, {id: '139-82',source: '139',target: '82'}
, {id: '262-82',source: '262',target: '82'}
, {id: '85-82',source: '85',target: '82'}
, {id: '229-120',source: '229',target: '120'}
, {id: '273-120',source: '273',target: '120'}
, {id: '85-120',source: '85',target: '120'}
, {id: '219-116',source: '219',target: '116'}
, {id: '175-116',source: '175',target: '116'}
, {id: '85-116',source: '85',target: '116'}
, {id: '250-141',source: '250',target: '141'}
, {id: '52-141',source: '52',target: '141'}
, {id: '85-141',source: '85',target: '141'}
, {id: '271-69',source: '271',target: '69'}
, {id: '131-69',source: '131',target: '69'}
, {id: '85-69',source: '85',target: '69'}
, {id: '142-98',source: '142',target: '98'}
, {id: '132-98',source: '132',target: '98'}
, {id: '85-98',source: '85',target: '98'}
, {id: '61-239',source: '61',target: '239'}
, {id: '156-239',source: '156',target: '239'}
, {id: '85-239',source: '85',target: '239'}
, {id: '118-233',source: '118',target: '233'}
, {id: '254-233',source: '254',target: '233'}
, {id: '85-233',source: '85',target: '233'}
, {id: '56-173',source: '56',target: '173'}
, {id: '134-173',source: '134',target: '173'}
, {id: '85-173',source: '85',target: '173'}
, {id: '192-249',source: '192',target: '249'}
, {id: '14-249',source: '14',target: '249'}
, {id: '85-249',source: '85',target: '249'}
, {id: '114-73',source: '114',target: '73'}
, {id: '88-73',source: '88',target: '73'}
, {id: '85-73',source: '85',target: '73'}
];
 
export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap zoomable pannable/>
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}