import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Tts from 'react-native-tts';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Ant from 'react-native-vector-icons/AntDesign';

const RoomSelectScreen = ({ route, navigation }: any) => {
  const { floor } = route.params;
  const [room, setRoom] = useState(1);
  const [confirmStep, setConfirmStep] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      Tts.setDefaultLanguage('th-TH');
      Tts.setDefaultRate(0.4);
      Tts.setDefaultPitch(1.2);

      Tts.stop();
      Tts.speak(
        `ตอนนี้ท่านอยู่ที่ชั้น ${floor} ค่ะ กรุณาเลือกหมายเลขห้องที่ท่านต้องการค่ะ โดยจะเริ่มที่ห้อง ${floor} ศูนย์ หนึ่ง ค่ะ 
        เมื่อเลือกแล้วกรุณากดปุ่มยืนยันด้านขวาบนค่ะ หรือถ้าต้องการยกเลิกให้กดปุ่มยกเลิกด้านซ้ายบนค่ะ`
      );

      return () => {
        Tts.stop();
      };
    }, [])
  );

  const numberToSpeech = (num: string | number) => {
    return num.toString().split('').map(d => {
      switch (d) {
        case '0': return 'ศูนย์';
        case '1': return 'หนึ่ง';
        case '2': return 'สอง';
        case '3': return 'สาม';
        case '4': return 'สี่';
        case '5': return 'ห้า';
        case '6': return 'หก';
        case '7': return 'เจ็ด';
        case '8': return 'แปด';
        case '9': return 'เก้า';
        case '-': return 'ขีด';
        default: return '';
      }
    }).join(' ');
  };

  const speakRoom = (f: number, r: number) => {
    const roomNumber = `${f}${r.toString().padStart(2, '0')}`;
    const spoken = numberToSpeech(roomNumber);
    Tts.stop();
    Tts.speak(`ห้อง ${spoken} ค่ะ`);
  };

  const handleIncrease = () => {
    setRoom(prev => {
      const newRoom = prev + 1;
      speakRoom(floor, newRoom);
      return newRoom;
    });
  };

  const handleDecrease = () => {
    setRoom(prev => {
      const newRoom = Math.max(prev - 1, 1);
      speakRoom(floor, newRoom);
      return newRoom;
    });
  };

  const handleConfirm = () => {
    if (confirmStep === 0) {
      Tts.stop();
      Tts.speak(
        `ท่านเลือกชั้น ${floor} ห้อง ${numberToSpeech(
          `${floor}${room.toString().padStart(2, '0')}`
        )} กรุณากดยืนยันอีกหนึ่งครั้งค่ะ`
      );
      setConfirmStep(1);
    } else {
      navigation.navigate('Map');
    }
  };

  return (
    <View style={styles.container}>
      {/* ปุ่มยกเลิก */}
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.navigate('FloorSelect')}
      >
        <Feather name="delete" size={40} color="#F06277" />
        {/* <Text style={styles.buttonText}>ยกเลิก</Text> */}
      </TouchableOpacity>

      {/* ปุ่มยืนยัน */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Ant name="check" size={40} color="#F06277" />
        {/* <Text style={styles.buttonText}> {confirmStep === 0 ? 'ยืนยัน' : 'ยืนยันอีกครั้ง'}</Text> */}
      </TouchableOpacity>

      {/* เนื้อหา */}
      <View style={styles.content}>
        <Icon name="door-open" size={200} color="#F06277" />
        {/* <Text style={styles.icon}>▯▯</Text> */}
        <Text style={styles.title}>ห้อง</Text>
        <Text style={styles.number}>
          {floor}
          {room.toString().padStart(2, '0')}
        </Text>
        <Text style={styles.subtitle}>
          กรุณาใส่หมายเลขห้องที่ท่านต้องการ{'\n'}
          เพิ่มเลขห้องแตะฝั่งขวา ลดเลขห้องแตะฝั่งซ้าย
        </Text>
      </View>

      {/* ปุ่มเพิ่ม/ลด */}
      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.bottomButton} onPress={handleDecrease}>
          <Text style={styles.arrow}>▼</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={handleIncrease}>
          <Text style={styles.arrow}>▲</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center' },
  cancelButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#4B5AC7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  confirmButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#4B5AC7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  // buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  content: { marginTop: 150, alignItems: 'center' },
  icon: { fontSize: 80, color: '#F06277', marginBottom: 20 },
  title: { fontSize: 26, color: '#2A2A2A', fontWeight: 'bold' },
  number: { fontSize: 40, color: '#F06277', marginVertical: 10 },
  subtitle: { fontSize: 14, color: '#555', textAlign: 'center' },
  bottomRow: {
   flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',        // เอาเต็มจอ
  // paddingHorizontal: 10,
  position: 'absolute',
  bottom: 1,
},
bottomButton: {
   backgroundColor: '#4B5AC7',
  width: 205,           // กำหนดขนาดตายตัว
  height: 220,
  borderRadius: 20,     // ครึ่งหนึ่งของ width/height → เป็นวงกลม
  alignItems: 'center',
  justifyContent: 'center',
},
arrow: { 
  fontSize: 50,         // ลูกศรใหญ่ขึ้น
  color: '#F06277',
  fontWeight: 'bold',
},

});

export default RoomSelectScreen;
