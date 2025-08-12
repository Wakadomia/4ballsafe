import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>보안 점검 앱</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Diagnosis')}
      >
        <Text style={styles.buttonText}>1️⃣ 새로운 보안진단 시작하기</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('History')}
      >
        <Text style={styles.buttonText}>2️⃣ 과거 보안진단 결과 확인</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // 예시: SKT 매장 위치 URL
          const url = 'https://www.tworld.co.kr/normal.do?serviceId=S_B2C_0010&viewId=V_CMN_0001';
          navigation.navigate('CarrierStore', { url });
        }}
      >
        <Text style={styles.buttonText}>3️⃣ 주위 통신사 매장 확인하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});