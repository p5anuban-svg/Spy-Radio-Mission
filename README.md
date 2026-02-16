# Micro:bit Spy Radio Mission 🕵️‍♂️

ภารกิจส่งข้อความลับด้วย Micro:bit - เข้ารหัสข้อความเป็นตัวเลขเพื่อส่งผ่านวิทยุ

A secret message encoder for Micro:bit - Convert letters to numbers for radio transmission

## 🎯 Features | คุณสมบัติ

- **Secret Message Encoding** | เข้ารหัสข้อความลับ
  - Convert letters (A-Z) to Micro:bit grid coordinates
  - Support for spacebar (position 5,5)
  - Real-time encoding as you type

- **Difficulty Levels** | ระดับความยาก
  - **Easy** | ง่าย: No masking (55)
  - **Medium** | ปานกลาง: 30% random digit masking (5* or *5)
  - **Hard** | ยาก: 60% random digit masking

- **Spy Mode Features** | ฟีเจอร์โหมดสายลับ
  - Password-style input masking
  - Toggle visibility button (eye icon)
  - Secret code table reference

- **Bilingual Interface** | อินเทอร์เฟซ 2 ภาษา
  - Thai and English displayed simultaneously
  - Optimized for classroom projection
  - Large fonts for better visibility

## 🚀 Quick Start | เริ่มต้นใช้งาน

1. Clone this repository
   ```bash
   git clone https://github.com/YOUR_USERNAME/microbit-spy-radio-mission.git
   ```

2. Open `index.html` in your web browser
   - No build process required
   - Works offline
   - Pure HTML, CSS, and JavaScript

## 📖 How to Use | วิธีใช้งาน

1. **Type your secret message** | พิมพ์ข้อความลับ
   - Enter letters A-Z or underscore (_)
   - Use spacebar for spaces between words

2. **Choose difficulty level** | เลือกระดับความยาก
   - Easy: Perfect for learning
   - Medium: Good practice
   - Hard: Challenge mode

3. **Get your secret code** | รับรหัสลับ
   - Numbers appear in format: `23-15-31-31-34`
   - Use the reference table to decode

4. **Send via Micro:bit radio** | ส่งผ่านวิทยุ Micro:bit
   - Transmit the encoded numbers
   - Receiver uses the table to decode

## 🎓 Educational Use | การใช้งานในห้องเรียน

Perfect for:
- Teaching coordinate systems
- Introduction to encryption
- Micro:bit programming projects
- Interactive classroom activities
- STEM education

เหมาะสำหรับ:
- สอนระบบพิกัด
- แนะนำการเข้ารหัส
- โปรเจค Micro:bit
- กิจกรรมในห้องเรียน
- การศึกษา STEM

## 🎨 Technology Stack | เทคโนโลยี

- **HTML5** - Structure
- **CSS3** - Styling with modern design
- **Vanilla JavaScript** - No dependencies
- **Google Fonts** - Inter & Sarabun

## 📱 Browser Support | รองรับเบราว์เซอร์

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## 🎯 Micro:bit Letter Grid | ตารางตัวอักษร

```
     1  2  3  4  5
  1  A  B  C  D  E
  2  F  G  H  I  K
  3  L  M  N  O  P
  4  R  S  T  U  V
  5  W  X  Y  Z  ␣
```

## 📝 License | ลิขสิทธิ์

MIT License - Feel free to use for educational purposes

## 🤝 Contributing | การมีส่วนร่วม

Contributions are welcome! Please feel free to submit a Pull Request.

## � Contact | ติดต่อ

Created with ❤️ for Micro:bit Learning

---

**Note**: This is an educational tool designed for classroom use with BBC Micro:bit devices.
