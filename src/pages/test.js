import { useEffect, useState } from 'react';
import { Button, Row, Col, Container, Card, Stack, Table, Form, Collapse } from 'react-bootstrap';
import moment from 'moment';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import 'primeicons/primeicons.css';

function ConfirmPage() {
    const tableHead = ['ลำดับ', 'เลขครุภัณฑ์', 'ชื่อครุภัณฑ์', 'ยี่ห้อ/รุ่น/ขนาด', 'Serial No.', 'ผู้ผลิต', 'ผู้จำหน่าย', 'จำนวนเงิน', '']

    const nameSet = [{
        field: "ผู้บันทึก",
        name: "ชื่อ นามสกุล",
        date: new Date().toISOString()
    }]
    // console.log(nameSet.date)

    // function formatDate(date) {

    // }

    const [item, setItem] = useState([])
    const [filter, setFilter] = useState("Waiting")
    const [listAll, setListAll] = useState(
        [{
            itemNo: 1277,
            date: new Date(),
            department: "ทดสอบ",
            status: "Waiting"
        },
        {
            itemNo: 1278,
            date: new Date(),
            department: "ทดสอบ",
            status: "Approve"
        },
        {
            itemNo: 1279,
            date: new Date(),
            department: "ทดสอบ",
            status: "Waiting"
        }]
    )
    // const [statusItem, setStatusItem] = useState({ all: 3, approve: 1, reject: 0 })

    const approveItem = (val) => {
        // const newList = listAll.filter(item => (item.itemNo != listAll[i].itemNo))
        // setListAll(newList)
        // setStatusItem({ ...statusItem, approve: statusItem.approve + 1 })
        const ind = listAll.findIndex(list => (list.itemNo == val))
        listAll[ind].status = "Approve"
        console.log(listAll)
    }
    const rejectItem = (val) => {
        const ind = listAll.findIndex(list => (list.itemNo == val))
        listAll[ind].status = "Reject"
    }
    const [selectItem, setSelectItem] = useState([{}])
    const [showList, setShowList] = useState(false)

    const addItem = () => {
        // console.log('e')
        const items = item.push([]);
        console.log(item)

    }

    const deleteItem = (index) => {
        const newList = item.filter((item, ind) => (ind != index))
        setItem(newList)
    }

    const optionDepartment = (
        <>
            <option value="1">หน่วยงาน1</option>
            <option value="2">หน่วยงาน2</option>
            <option value="3">หน่วยงาน3</option>
        </>
    )

    const saveToList = () => {
        // setListAll(...listAll, {})
    }

    function renderMonth(props, month, year, selectedDate) {
        const date = new Date();
        date.setMonth(month);
        return <td {...props}>{date.toLocaleString('th-TH', { month: 'long', })}</td>;
    }

    function renderYear(props, year, selectedDate) {
        return <td {...props}>{year + 543}</td>;
        // return <td {...props}>{year % 100}</td>;
    }

    return (
        <div>
            <div className="text-head" style={{ background: "white" }}>
                อนุมัติเบิกจ่ายครุภัณฑ์
            </div>
            <div className="content">
                <Row className='text-head'>
                    รายการเสนออนุมัติประจำวัน
                    <Col md="8">
                        <Stack direction="horizontal" gap={2} className="ms-auto">
                            <i className="pi pi-calendar" />
                            {/* <InputGroup icon className="input-date-time">
                                <InputGroup.Addon addonType="prepend">
                                    <FontAwesomeIcon icon={SolidIcon.faCalendarAlt} className="text-warning" />
                                </InputGroup.Addon>
                            </InputGroup> */}
                            <Datetime className='calendar'
                                // initialValue='dd/mm/yyyy'
                                initialValue={new Date().toLocaleDateString('th-TH', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                                // dateFormat='ddddd mm yyyy'
                                // isValidDate
                                // locale='th-TH'
                                utc
                                // renderMonth={(props, month) => console.log(month)}
                                onChange={(event) => {
                                    console.log(new Date().getMonth())
                                    const date = (new Date(event))
                                    const result = date.toLocaleDateString('th-TH', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })
                                    console.log(result)
                                    // setFilter()
                                }}
                                timeFormat={false}
                                renderYear={renderYear}
                                renderMonth={renderMonth}
                            />

                            <Form.Select size='sm'
                                placeholder='หน่วยงาน'
                                value={item.department}>
                                <option>หน่วยงานที่เสนอ / รหัส P4P</option>
                                {optionDepartment}
                            </Form.Select>

                            <Form.Control
                                size='sm'
                                value="ดูทั้งหมด"
                            />
                        </Stack>
                    </Col>
                </Row>
                <Stack direction="horizontal" gap={2} className="p-2">
                    <Button className='btn-status' variant='light' onClick={() => setFilter("")}>
                        <i className="pi pi-file" />
                        ทั้งหมด
                        {listAll.length}
                    </Button>
                    <Button className='btn-status' variant='light' onClick={() => setFilter("Waiting")}>
                        <i className="pi pi-file" />
                        รออนุมัติ
                        {listAll.filter(ele => ele.status == "Waiting").length}
                        {/* {listAll.length} */}
                    </Button>
                    <Button className='btn-status' variant='light' onClick={() => setFilter("Approve")}>
                        <i className="pi pi-check-circle" />
                        อนุมัติแล้ว
                        {listAll.filter(ele => ele.status == "Approve").length}
                        {/* {statusItem.approve} */}
                    </Button>
                    <Button className='btn-status' variant='light'
                        onClick={() => setFilter("Reject")}>
                        <i className="pi pi-times-circle" />
                        Reject
                        {listAll.filter(ele => ele.status == "Reject").length}
                        {/* {statusItem.reject} */}
                    </Button>
                </Stack>
            </div>

            <div className="content-page">

                <Row className='m-0'>
                    {/* left side */}
                    <Collapse in={showList} dimension="width">
                        <Col md="4" className="content" >
                            <div className='text-head'>
                                <Stack direction="horizontal" gap={2}>
                                    รายการเสนออนุมัติ
                                    <Button variant='' className='ms-auto btn-collapse' onClick={() => setShowList(!showList)}>
                                        <i className="pi  pi-angle-left" />
                                    </Button>
                                </Stack>
                            </div>
                            {listAll?.filter(ele => filter ? ele.status == filter : ele).map((item, index) => (
                                <Card className='box-item' onClick={() => setSelectItem([item])}>
                                    <Row>
                                        <Col>
                                            <span>เลขที่ใบเบิก</span> {item.itemNo}
                                        </Col>
                                        <Col align="right">
                                            {moment(item.date).format("DD/MM/YYYY HH.mm")}
                                        </Col>
                                    </Row>
                                    <div>
                                        <span>หน่วยงานที่เสนอ</span> {item.department}
                                    </div>
                                    <hr className='mb-2' />
                                    <Stack direction="horizontal" gap={2} className='ms-auto'>
                                        {item.status == "Waiting"
                                            ? <>
                                                <Button variant="danger" onClick={() => rejectItem(item.itemNo)}>Reject</Button>
                                                <Button variant="success" onClick={() => approveItem(item.itemNo)}>อนุมัติ</Button>
                                            </>
                                            : item.status
                                        }
                                    </Stack>
                                </Card>
                            ))}
                        </Col>
                    </Collapse>

                    {/* right side */}
                    <Col className="content">
                        <div
                            hidden={showList}
                            variant='light'
                            className='btn-status expand'
                            onClick={() => setShowList(true)}
                        >
                            <i className="pi  pi-angle-right" />
                        </div>

                        <div className='text-head'>
                            <Stack direction="horizontal" gap={2}>
                                รายการรอขออนุมัติเบิกจ่ายครุภัณฑ์
                                <Button variant="outline-success" className='ms-auto'>ดูรายละเอียด</Button>
                                <Button variant="outline-success">พิมพ์</Button>
                            </Stack>
                        </div>
                        <div className='text-head mb-3'>
                            <Stack direction="horizontal">
                                บันทึกใบเบิกครุภัณฑ์
                                <Button variant="success" className='ms-auto'
                                    onClick={saveToList}>บันทึก</Button>
                            </Stack>
                        </div>
                        <Row>
                            {selectItem.map(item => (
                                <>
                                    <Col sm="12" md="4">
                                        <div>
                                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                                <Form.Label column sm={3}>
                                                    ID ใบเบิก
                                                </Form.Label>
                                                <Col >
                                                    <Form.Control
                                                        size='sm'
                                                    />
                                                </Col>
                                            </Form.Group>
                                        </div>
                                        <Form.Group as={Row} className='mb-3'>
                                            <Form.Label column sm={3}>
                                                หน่วยงาน
                                            </Form.Label>
                                            <Col>
                                                <Form.Select size='sm' value={item.department}>
                                                    <option>{item.department || ""}</option>
                                                    {optionDepartment}
                                                </Form.Select>
                                            </Col>
                                        </Form.Group>
                                        <div>
                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm={3}>
                                                    หมายเหตุ
                                                </Form.Label>
                                                <Col>
                                                    <Form.Control
                                                        as="textarea"
                                                    />
                                                </Col>
                                            </Form.Group>
                                        </div>
                                    </Col>
                                    <Col sm="12" md="4">
                                        <Form.Group as={Row} className='mb-3'>
                                            <Form.Label column sm={3}>
                                                เลขที่ใบเบิก
                                            </Form.Label>
                                            <Col>
                                                <Form.Control
                                                    size='sm'
                                                    value={item.itemNo}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className='mb-3'>
                                            <Form.Label column sm={3}>
                                                ผู้มีสิทธิ์เบิก
                                            </Form.Label>
                                            <Col>
                                                <Form.Control
                                                    size='sm'
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className='mb-3'>
                                            <Form.Label column sm={3}>
                                                จำนวนเงิน
                                            </Form.Label>
                                            <Col>
                                                <Form.Control
                                                    size='sm'
                                                // value={item.itemNo.reverse()}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                    <Col sm="12" md="4">
                                        <Form.Group as={Row} className='mb-3'>
                                            <Form.Label column sm={3}>
                                                ทะเบียนเอกสาร
                                            </Form.Label>
                                            <Col>
                                                <Form.Control
                                                    size='sm'
                                                />
                                            </Col>
                                        </Form.Group>

                                        <div>
                                            <Form.Group as={Row} className='mb-3'>
                                                <Form.Label column sm={3}>
                                                    วันที่เบิก
                                                </Form.Label>
                                                <Col>
                                                    <Datetime className='inForm' />

                                                </Col>
                                            </Form.Group>
                                        </div>
                                        <div hidden>
                                            เลือกปีงบประมาณ
                                        </div>
                                    </Col>
                                </>
                            ))}
                        </Row>

                        <div className='text-head'>
                            <Stack direction="horizontal">
                                รายงานใบเบิกครุภัณฑ์
                                <Button variant="success" className='ms-auto'
                                    onClick={addItem}>เพิ่มใบเบิกครุภัณฑ์</Button>
                            </Stack>
                        </div>
                        <p>
                            รวม: {item.length} รายการ
                        </p>
                        <Table hover>
                            {tableHead.map(ele => (
                                <th>
                                    {ele}
                                </th>
                            ))}
                            {/* {item.length > 0 && */}

                            {item.map((ele, ind) => (
                                <tr>
                                    <td align='center'>{ind + 1}</td>
                                    <td>
                                        <Form.Control
                                            className="input-table"
                                            name=""
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            className="input-table"
                                            name=""
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            className="input-table"
                                            name=""
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            className="input-table"
                                            name=""
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            className="input-table"
                                            name=""
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            className="input-table"
                                            name=""
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            className="input-table"
                                            name=""
                                        />
                                    </td>
                                    <td>
                                        <i className="pi pi-trash"
                                            onClick={() => deleteItem(ind)}></i>
                                    </td>
                                </tr>
                            ))}
                            {/*  } */}
                        </Table>
                    </Col>
                </Row>
            </div>

            <div className="content">
                <Row>
                    <Col sm="6" xs="12" md="3">
                        {nameSet.map(ele => (
                            <>
                                <div className='text-head'>
                                    {ele.field}
                                </div>
                                <div>
                                    {ele.name}
                                </div>
                                {moment(ele.date).format("DD/MM/YYYY HH.mm")}
                            </>
                        ))}
                    </Col>
                    {['ผู้แก้ไข', 'ผู้ส่งเรื่อง', 'ผู้อนุมัติ'].map(ele => (
                        <Col sm="6" xs="12" md="3">
                            <div className='text-head'>
                                {ele}
                            </div>
                            <div>
                                xxxxx xxxxxxxxxxx
                            </div>
                            {/* {new Date()} */}
                        </Col>
                    ))}
                </Row>
            </div>
        </div >
    )
}

export default ConfirmPage