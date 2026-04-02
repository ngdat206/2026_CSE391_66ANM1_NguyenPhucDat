import React, { useState, useEffect } from 'react';
import recordsData from './data.js'; 
import { Table, Button, Modal, Form, Alert, Row, Col } from 'react-bootstrap';
import './App.css'; // 


function App() {
   
    // Danh sách nhân sự lấy từ file data.js
    const [danhSach, setDanhSach] = useState([]);
    
    
    useEffect(() => {
        setDanhSach(recordsData); 
    }, []);

    const [hienModal, setHienModal] = useState(false);
    
    
    const [hienTai, setHienTai] = useState({ id: null, name: '', email: '',diengia: '', vitri:'' });
    
  
    const [loi, setLoi] = useState('');


    
    // Hàm đóng modal
    const dongModal = () => {
        setLoi('');
        setHienModal(false);
    };

    // Hàm mở modal (thêm mới hoặc sửa)
    const moModal = (banGhi = { id: null, name: '', email: '', diengia: '', vitri:'' }) => {
        setHienTai(banGhi);
        setLoi('');
        setHienModal(true);
    };
   
    const kiemTra = () => {
        
        if (!hienTai.name || !hienTai.email  || !hienTai.diengia || !hienTai.vitri) {
            setLoi('Vui lòng điền đầy đủ thông tin.');
            return false;
        }
      
        if (!hienTai.email.includes('@')) {
            setLoi('Vui lòng nhập email phải bao gồm @!');
            return false;
        }
        
        return true;
    };

    
    const xuLyGui = (e) => {
        e.preventDefault();
        if (!kiemTra()) return; // Kiểm tra dữ liệu trước
        
        
        else {
            setDanhSach([...danhSach, { ...hienTai, id: Date.now() }]);
        }
        dongModal();
    };
   
   
    return (
        <div className="app-container">
          <h2 className="app-title">Bảng điều khiển hội thảo</h2>
          <p> Theo dõi lịch, diễn giả và địa điểm các sự kiện.</p>
          
<Row className="mb-4">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label className="search-label">Lọc danh sách</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Gỡ để lọc bảng..."
                                className="search-input"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                      <Form.Label>Địa điểm</Form.Label>
                      <Form.Select 
                        value={hienTai.category} 
                        onChange={(e) => setHienTai({ ...hienTai, category: e.target.value })}
                      >
                        <option value="">-- Tất cả --</option>
                        <option value="Nhân viên">Miền Bắc</option>
                        <option value="Quản lý">Miền Nam</option>
                        <option value="Giám đốc">Miền Trung</option>
                      </Form.Select>
                    </Form.Group>

                    </Col>
                </Row>

          <div className="action-buttons">
            {/* Nút thêm mới nhân sự */}
            <Button variant="primary" onClick={() => moModal()}>
                Thêm mới
            </Button>
          </div>

          <Table striped bordered hover>
            {/* Header bảng */}
            <thead>
              <tr>
                <th>Tên hội thảo</th>
                <th>Diễn giả</th>
                <th>Email</th>
                <th>Ngày tổ chức</th>
                <th>Địa điểm</th>
              </tr>
            </thead>
            {/* Body bảng - duyệt qua danh sách nhân sự */}
            <tbody>
              {danhSach.map((banGhi, index) => (
                <tr key={banGhi.id}>
                  <td>{index + 1}</td>
                  <td>{banGhi.name}</td>
                  <td>{banGhi.email}</td>
                  <td>{banGhi.diengia}</td>
                  <td>{banGhi.vitri}</td>
                  
                </tr>
              ))}
            </tbody>
          </Table>
      
        
          <Modal show={hienModal} onHide={dongModal}>
            <Modal.Header closeButton>
              <Modal.Title className="modal-title">
                {hienTai.id ? 'Sửa thông tin nhân sự' : 'Thêm hội thảo mới'}
              </Modal.Title>
            </Modal.Header>
            <Form onSubmit={xuLyGui}>
              <Modal.Body>
               
                {loi && <Alert variant="danger">{loi}</Alert>}
                
               
                <Row>
                  {/* ===== CỘT TRÁI ===== */}
                  <Col md={6}>
                    {/* Input Họ tên */}
                    <Form.Group className="mb-3">
                      <Form.Label>Tên hội thảo</Form.Label>
                      <Form.Control
                        value={hienTai.name}
                        onChange={(e) => setHienTai({ ...hienTai, name: e.target.value })}
                        required
                      />
                    </Form.Group>

                     {/* Input Email */}
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        value={hienTai.email}
                        onChange={(e) => setHienTai({ ...hienTai, email: e.target.value })}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Địa điểm</Form.Label>
                      <Form.Control
                        value={hienTai.vitri}
                        onChange={(e) => setHienTai({ ...hienTai, vitri: e.target.value })}
                        required
                      />
                    </Form.Group>
                  
                  </Col>

                  {/* ===== CỘT PHẢI ===== */}
                  <Col md={6}>
  
                    <Form.Group className="mb-3">
                      <Form.Label>Diễn giả</Form.Label>
                      <Form.Control
                        value={hienTai.diengia}
                        onChange={(e) => setHienTai({ ...hienTai, diengia: e.target.value })}
                        required
                      />
                    </Form.Group>


                    <Form.Group className="mb-3">
                      <Form.Label>Ngày tổ chức</Form.Label>
                      <Form.Control
                        type="date"
                        value={hienTai.date}
                        onChange={(e) => setHienTai({ ...hienTai, date: e.target.value })}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
               

                </Modal.Body>
                
                <Modal.Footer>
                  {/* Nút Hủy - đóng modal */}
                  <Button variant="secondary" onClick={dongModal}>Hủy</Button>
                  {/* Nút Lưu/Thêm - submit form */}
                  <Button variant="primary" type="submit">
                    {hienTai.id ? 'Lưu' : 'Lưu'}
                  </Button>
                </Modal.Footer>
              </Form>
          </Modal>
        </div>
      );
      
}

export default App;


