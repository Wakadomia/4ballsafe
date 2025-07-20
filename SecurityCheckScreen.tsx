import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import RNSimData from 'react-native-sim';
import NetInfo from '@react-native-community/netinfo';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'SecurityCheck'>;

export default function SecurityCheckScreen({ navigation }: Props) {
  const [loading, setLoading] = useState(true);

  const [osResult, setOsResult] = useState<'안전' | '위험'>('안전');
  const [osName, setOsName] = useState('');
  const [osVersion, setOsVersion] = useState('');

  const [simStatus, setSimStatus] = useState<'정상' | '문제 있음' | '지원되지 않음'>('정상');
  const [carrierName, setCarrierName] = useState<string | null>(null);

  const [vpnActive, setVpnActive] = useState(false);
  const [wifiSSID, setWifiSSID] = useState<string | null>(null);
  const [wifiSecure, setWifiSecure] = useState<boolean | null>(null);
  const [networkRisk, setNetworkRisk] = useState<'안전' | '주의' | '위험'>('안전');

  useEffect(() => {
    const runSecurityCheck = async () => {
      // OS 검사
      const name = DeviceInfo.getSystemName();
      const version = DeviceInfo.getSystemVersion();

      setOsName(name);
      setOsVersion(version);

      const majorVersion = parseInt(version.split('.')[0], 10);
      let osCheck: '안전' | '위험' = '안전';

      if (name === 'Android' && majorVersion < 10) {
        osCheck = '위험';
      } else if (name === 'iOS' && majorVersion < 14) {
        osCheck = '위험';
      }

      setOsResult(osCheck);

      // SIM 검사
      if (Platform.OS === 'android') {
        try {
          const simInfo = RNSimData.getSimInfo();
          const carrier = simInfo.carrierName0;
          if (!carrier || carrier === 'null') {
            setSimStatus('문제 있음');
          } else {
            setSimStatus('정상');
            setCarrierName(carrier);
          }
        } catch (err) {
          setSimStatus('문제 있음');
        }
      } else {
        setSimStatus('지원되지 않음');
      }

      // 네트워크 검사
      const state = await NetInfo.fetch();

      if (state.type === 'vpn') {
        setVpnActive(true);
      }

      if (state.type === 'wifi') {
        setWifiSSID(state.details?.ssid || 'Unknown');
        // 보안 미적용 여부 추정: encryptionType === 'none'이면 비보안
        const encryptionType = state.details?.isConnectionExpensive === false ? 'secured' : 'none';
        const secure = encryptionType !== 'none';
        setWifiSecure(secure);
      }

      // VPN 없이 공개 Wi-Fi 사용 감지
      if (state.type === 'wifi' && !vpnActive && wifiSecure === false) {
        setNetworkRisk('위험');
      } else if (state.type === 'wifi' && !vpnActive && wifiSecure === true) {
        setNetworkRisk('주의');
      } else {
        setNetworkRisk('안전');
      }

      setLoading(false);
    };

    runSecurityCheck();
  }, [vpnActive, wifiSecure]);

  return (
    <View style={styles.container}>
      {loading ? (
        <>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.text}>보안 자동 점검 중입니다...</Text>
        </>
      ) : (
        <>
          {/* OS 검사 결과 */}
          <Text style={styles.title}>📱 OS 검사</Text>
          <Text>OS: {osName} {osVersion}</Text>
          <Text>{osResult === '안전' ? '✅ 안전' : '❌ 위험: 업데이트 필요'}</Text>

          {/* SIM 검사 결과 */}
          <Text style={[styles.title, { marginTop: 20 }]}>📶 SIM 검사</Text>
          <Text>상태: {simStatus}</Text>
          {carrierName && <Text>통신사: {carrierName}</Text>}
          {simStatus === '지원되지 않음' && <Text>iOS에서는 지원되지 않습니다</Text>}

          {/* 네트워크 검사 결과 */}
          <Text style={[styles.title, { marginTop: 20 }]}>🌐 네트워크 검사</Text>
          <Text>VPN: {vpnActive ? '사용 중' : '사용 안 함'}</Text>
          <Text>Wi-Fi: {wifiSSID || '정보 없음'}</Text>
          <Text>Wi-Fi 보안: {wifiSecure === false ? '보안 없음' : wifiSecure === true ? '보안 적용' : '정보 없음'}</Text>

          <Text style={{ marginTop: 10, fontWeight: 'bold', color: networkRisk === '위험' ? 'red' : networkRisk === '주의' ? 'orange' : 'green' }}>
            {networkRisk === '위험' && '❌ VPN 없이 보안 없는 Wi-Fi 사용 중입니다. 위험할 수 있습니다!'}
            {networkRisk === '주의' && '⚠️ VPN 없이 Wi-Fi 사용 중 (보안 적용)'}
            {networkRisk === '안전' && '✅ 안전'}
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  text: { marginTop: 20, fontSize: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
});
