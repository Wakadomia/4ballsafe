import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { questions } from '../services/DiagnosisService';  // 질문 목록은 따로 관리 추천!

type Props = NativeStackScreenProps<RootStackParamList, 'Diagnosis'>;

export default function DiagnosisScreen({ navigation }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (isYes: boolean) => {
    const question = questions[currentIndex];
    const point = isYes ? question.scoreYes : question.scoreNo;
    setScore(score + point);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('Result', { score: score + point });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{currentQuestion.text}</Text>

      <TouchableOpacity style={styles.button} onPress={() => handleAnswer(true)}>
        <Text style={styles.buttonText}>네, 맞습니다</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleAnswer(false)}>
        <Text style={styles.buttonText}>아닙니다</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  questionText: { fontSize: 18, textAlign: 'center', marginBottom: 40 },
  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: { color: '#FFF', fontSize: 16 },
});