import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Tts from 'react-native-tts';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ant from 'react-native-vector-icons/AntDesign';

const FloorSelectScreen = ({ navigation }: any) => {
  const [floor, setFloor] = useState(1);

  useFocusEffect(
    React.useCallback(() => {
      Tts.setDefaultLanguage('th-TH');
      Tts.setDefaultRate(0.4);
      Tts.setDefaultPitch(1.2);

      Tts.stop();
      Tts.speak(
        'ยินดีต้อนรับสู่ระบบนำทางภายในคณะวิศวกรรมศาสตร์ มหาวิทยาลัยธรรมศาสตร์ค่ะ กรุณาเลือกชั้นที่ท่านต้องการค่ะ โดยจะเริ่มที่ชั้น 1 ค่ะ หากต้องการขึ้นไปชั้นบนให้กดปุ่มทางขวาล่างค่ะ แต่ถ้าต้องลงจากชั้นเดิมให้กดปุ่มซ้ายล่างค่ะ เมื่อเลือกแล้วกรุณากดปุ่มยืนยันด้านขวาบนค่ะ'
      );

      return () => {
        Tts.stop();
      };
    }, [])
  );

  const speakFloor = (f: number) => {
    Tts.stop();
    Tts.speak(`ชั้น ${f} ค่ะ`);
  };

  const handleIncrease = () => {
  setFloor((prev) => {
    if (prev >= 7) {
      Tts.stop();
      Tts.speak("ท่านอยู่ชั้นสูงสุดแล้วค่ะ");
      return prev; // ไม่เปลี่ยนค่า
    }
    const newFloor = prev + 1;
    speakFloor(newFloor);
    return newFloor;
  });
};


  const handleDecrease = () => {
    setFloor((prev) => {
      if (prev === 1) {
      Tts.stop();
      Tts.speak("ท่านอยู่ชั้นล่างสุดแล้วค่ะ");
      return prev; // ไม่เปลี่ยนค่า
    }
      const newFloor = Math.max(prev - 1, 1);
      speakFloor(newFloor);
      return newFloor;
    });
  };

  const handleConfirm = () => {
  Tts.stop();
  Tts.speak(`ท่านเลือกชั้น ${floor} กรุณาเลือกหมายเลขห้องต่อไปค่ะ`);
  
  setTimeout(() => {
    navigation.navigate('RoomSelect', { floor });
  }, 2500); // รอ 2.5 วิ ก่อนเปลี่ยนหน้า
};

  return (
    <View style={styles.container}>
      {/* ปุ่มยกเลิก */}
      {/* <TouchableOpacity style={[styles.cornerButton, styles.leftTop]} onPress={() => navigation.goBack()}>
        <Text style={styles.cornerText}>ยกเลิก</Text>
      </TouchableOpacity> */}

      {/* ปุ่มยืนยัน */}
      <TouchableOpacity style={[styles.cornerButton, styles.rightTop]} onPress={handleConfirm}>
        <Ant name="check" size={40} color="#F06277" />
        {/* <Text style={styles.cornerText}>ยืนยัน</Text> */}
      </TouchableOpacity>

      {/* icon ลิฟต์ (mock เป็นกล่องแดงแทนก่อน) */}
      {/* style={styles.elevatorBox} */}
      <View style={styles.content}> 
        <Icon name="elevator" size={200} color={"#F06277"} />
        {/* <Text style={{ color: 'white' }}>Elevator</Text> */}
      
      {/* ข้อความ ชั้น */}
      <Text style={styles.floorLabel}>ชั้น</Text>
      <Text style={styles.floorNumber}>{floor}</Text>

      {/* คำอธิบาย */}
      <Text style={styles.desc}>
        กรุณาใส่เลขชั้นที่ท่านต้องการ{"\n"}
        เพิ่มเลขชั้นแตะฝั่งขวา ลดเลขชั้นแตะฝั่งซ้าย
      </Text>
    </View>

      {/* ปุ่มเพิ่ม/ลด */}
      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.arrowButton} onPress={handleDecrease}>
          <Text style={styles.arrowText}>▼</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.arrowButton} onPress={handleIncrease}>
          <Text style={styles.arrowText}>▲</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#fff', alignItems:'center', justifyContent:'center' },
  content: { marginBottom: 150, alignItems: 'center' },
  cornerButton: {
    position: 'absolute',
    top: 20,
    backgroundColor: '#3F51B5',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  leftTop: { left: 20 },
  rightTop: { right: 20 },
  cornerText: { color: 'white', fontWeight: 'bold' },

  elevatorBox: {
    width: 120, height: 120,
    backgroundColor: '#E57373',
    marginBottom: 20,
    alignItems:'center', justifyContent:'center',
    borderRadius: 8
  },

  floorLabel: { fontSize: 22, color:'#1A237E', marginTop: 10 },
  floorNumber: { fontSize: 40, fontWeight:'bold', color:'#E53935', marginVertical: 8 },
  desc: { textAlign:'center', color:'#1A237E', fontSize:14, marginTop: 10 },

   bottomRow: {
     flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',        // เอาเต็มจอ
  // paddingHorizontal: 10,
  position: 'absolute',
  bottom: 1,
  },
  arrowButton: {
    backgroundColor: '#4B5AC7',
  width: 205,           // กำหนดขนาดตายตัว
  height: 220,
  borderRadius: 20,     // ครึ่งหนึ่งของ width/height → เป็นวงกลม
  alignItems: 'center',
  justifyContent: 'center',
  },
  arrowText: {  fontSize: 50,         // ลูกศรใหญ่ขึ้น
  color: '#F06277',
  fontWeight: 'bold',}
});

export default FloorSelectScreen;
