import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Tts from 'react-native-tts';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Ant from 'react-native-vector-icons/AntDesign';

const RoomSelectScreen = ({ route, navigation }: any) => {
  const { floor } = route.params as { floor: keyof typeof rooms };
  const [roomIndex, setRoomIndex] = useState(0);
  const [confirmStep, setConfirmStep] = useState(0);
  
  const rooms = {
    1: [101, 102],
    2: [201, 202, '202-1', '202-2', '202-3', '202-4', '202-5', '202-6', '202-7', '202-8', '202-9', 204, 205, '205-1', '205-2', '205-3', '205-4', 206, 207, 208, 209, 211, '211-1', 212, '212-1', '212-2'],
    3: [301, 302, 303, 304, 305, 306, 308, 309, 310, 311, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325],
    4: [401, 402, '402-1', '402-2', 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425],
    5: [501, 502, 503, 504, 505, '505-1', '505-2', '505-3', 506, 507, '507-1', '507-2', '507-3', '508-1', '508-2', 509, 510, 511],
    6: [601, '601-1', 602, 603, '603-1', '604-1', '604-2', '604-3', 605, '605-1', 606, '606-1', 607, 608, 609, 610, '611-1', '611-2', 612, 613],
    7: [702, 703, 704, 705, 706, 707, 708, 709, 710, 711, 712, '713-1', '713-2', 714, 715, 716, 717]
  };

  const floorRooms = rooms[floor] || [];

  useFocusEffect(
  React.useCallback(() => {
    Tts.setDefaultLanguage('th-TH');
    Tts.setDefaultRate(0.4);
    Tts.setDefaultPitch(1.2);
    Tts.stop();
    if (floorRooms.length > 0) {
      const spokenRoom = numberToSpeech(floorRooms[0]);
      Tts.speak(
        `ตอนนี้ท่านอยู่ที่ชั้น ${floor} ค่ะ กรุณาเลือกหมายเลขห้องที่ท่านต้องการค่ะ โดยจะเริ่มที่ห้อง ${spokenRoom} ค่ะ 
        เมื่อเลือกแล้วกรุณากดปุ่มยืนยันด้านขวาบนค่ะ หรือถ้าต้องการยกเลิกให้กดปุ่มยกเลิกด้านซ้ายบนค่ะ`
      );
    }

    return () => {
      Tts.stop();
    };
  }, [floor])
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

  const speakRoom = (roomValue: string | number) => {
    const spoken = numberToSpeech(roomValue);
    Tts.stop();
    Tts.speak(`ห้อง ${spoken} ค่ะ`);
  };

  const handleIncrease = () => {
    setRoomIndex(prev => {
      const maxIndex = rooms[floor].length - 1;
      if (prev < maxIndex) {
        const newIndex = prev + 1;
        speakRoom(rooms[floor][newIndex]);
        return newIndex;
      } else {
        Tts.stop();
        Tts.speak("ท่านอยู่ห้องสุดท้ายแล้วค่ะ");
        return prev;
      }
    });
  };

  const handleDecrease = () => {
    setRoomIndex(prev => {
      if (prev > 0) {
        const newIndex = prev - 1;
        speakRoom(rooms[floor][newIndex]);
        return newIndex;
      } else {
        Tts.stop();
        Tts.speak("ท่านอยู่ห้องแรกแล้วค่ะ");
        return prev;
      }
    });
  };

  const handleConfirm = () => {
    if (floorRooms.length === 0) return;
    const currentRoom = floorRooms[roomIndex];

    if (confirmStep === 0) {
      Tts.stop();
      Tts.speak(
        `ท่านเลือกชั้น ${floor} ห้อง ${numberToSpeech(currentRoom)} กรุณากดยืนยันอีกหนึ่งครั้งค่ะ`
      );
      setConfirmStep(1);
    } else {
      navigation.navigate('Map');
    }
  };

  const currentRoom = floorRooms.length > 0 ? floorRooms[roomIndex] : '--';

  return (
    <View style={styles.container}>
      {/* ปุ่มยกเลิก */}
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.navigate('FloorSelect')}
      >
        <Feather name="delete" size={40} color="#F06277" />
      </TouchableOpacity>

      {/* ปุ่มยืนยัน */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Ant name="check" size={40} color="#F06277" />
      </TouchableOpacity>

      {/* เนื้อหา */}
      <View style={styles.content}>
        <Icon name="door-open" size={200} color="#F06277" />
        <Text style={styles.title}>ห้อง</Text>
        <Text style={styles.number}>{currentRoom}</Text>
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
  content: { marginTop: 150, alignItems: 'center' },
  title: { fontSize: 26, color: '#2A2A2A', fontWeight: 'bold' },
  number: { fontSize: 40, color: '#F06277', marginVertical: 10 },
  subtitle: { fontSize: 14, color: '#555', textAlign: 'center' },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: 1,
  },
  bottomButton: {
    backgroundColor: '#4B5AC7',
    width: 205,
    height: 220,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: { 
    fontSize: 50,
    color: '#F06277',
    fontWeight: 'bold',
  },
});

export default RoomSelectScreen;
