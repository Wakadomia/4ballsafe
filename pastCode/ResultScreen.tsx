import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export default function ResultScreen({ route, navigation }: Props) {
  const { score } = route.params;

  let level = '';
  let description = '';

  if (score <= 2) {
    level = '✅ 안전';
    description = '기본 보안 습관 양호';
  } else if (score <= 5) {
    level = '⚠️ 주의';
    description = '일부 취약점 존재, 개선 필요';
  } else {
    level = '❌ 위험';
    description = '보안 취약, 조치 강력 권고';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>진단 결과</Text>
      <Text style={styles.score}>총 점수: {score}점</Text>
      <Text style={styles.level}>{level}</Text>
      <Text style={styles.description}>{description}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => { navigation.navigate('SecurityCheck');
          console.log('보안 자동진단하기 버튼 클릭');
          // 여기에 자동진단 화면으로 이동할 로직 추가 가능
        }}
      >
        <Text style={styles.buttonText}>🔍 보안 자동진단하기</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#888' }]}
        onPress={() => {
          // 다시하기 → DiagnosisScreen으로 stack 초기화 이동
          navigation.replace('Diagnosis');
        }}
      >
        <Text style={styles.buttonText}>🔄 다시하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  score: { fontSize: 20, marginBottom: 10 },
  level: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 16, textAlign: 'center', marginBottom: 30 },
  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#FFF', fontSize: 16 },
});