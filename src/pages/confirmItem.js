import { useEffect, useState } from 'react';
import { Button, Row, Col, Card, Stack, Table, Form, Collapse, InputGroup } from 'react-bootstrap';
import moment from 'moment';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import 'primeicons/primeicons.css';

function ConfirmPage() {
    const defaultDepartment = (
        ["หน่วยงาน 1", "หน่วยงาน 2", "หน่วยงาน 3"]
    )
    const nameSet = [{
        field: "ผู้บันทึก",
        name: "ชื่อ นามสกุล",
        date: new Date().toISOString(),
    }]
    const [listAll, setListAll] = useState(
        [{
            itemId: genId(),
            itemNo: 1277,
            date: new Date(),
            department: "ทดสอบ",
            status: "Waiting"
        },
        {
            itemNo: 1278,
            date: new Date(),
            department: "ทดสอบ",
            status: "Approve",
            itemId: genId()
        },
        {
            itemNo: 1279,
            date: new Date(),
            department: "ทดสอบ",
            status: "Waiting",
            itemId: genId()
        }]
    )
    const [filter, setFilter] = useState("")
    const [optionDepartment, setOptionDepartment] = useState(defaultDepartment)
    const [pickDateTime, setPickDateTime] = useState()
    const [selectItem, setSelectItem] = useState([{}])
    const [showList, setShowList] = useState(false)
    const [items, setItems] = useState([])

    function genId() {
        return Math.floor(10e5 + Math.random() * 10e5)
    }

    const approveItem = (val) => {
        const ind = listAll.findIndex(list => (list.itemNo === val))
        listAll[ind].status = "Approve"
        console.log(listAll)
    }
    const rejectItem = (val) => {
        const ind = listAll.findIndex(list => (list.itemNo === val))
        listAll[ind].status = "Reject"
    }

    function renderMonth(props, month, year, selectedDate) {
        const date = new Date();
        date.setMonth(month);
        return <td {...props}>{date.toLocaleString('th-TH', { month: 'long', })}</td>;
    }

    function renderYear(props, year, selectedDate) {
        return <td {...props}>{year + 543}</td>;
    }

    useEffect(() => {
        setShowList(true)
    }, [filter !== ""])

    const [err, setErr] = useState(false)
    const submit = (e) => {
        e.preventDefault()
        if (!items.length) {
            setErr(true)
            return
        }

        const formData = new FormData(e.target)
        const formDataObj = Object.fromEntries(formData.entries())
        const allData = { ...formDataObj, date: pickDateTime || selectItem[0].date, inventory: items }
        let itemNo
        const newList = listAll.sort((a, b) => a.itemNo - b.itemNo)
            .map(function (list) {
                itemNo = list.itemNo
                return list.itemId === selectItem[0].itemId
                    ? { ...list, ...allData, updateDate: new Date() } : list;
            })

        setListAll(formDataObj.itemNo
            ? newList
            : [...newList, { ...allData, itemId: genId(), itemNo: itemNo + 1, status: "Waiting" }]
        )
        // clear form
        setSelectItem([{}])
        setItems([])
    }
    // อัพเดทหน่วยงานเพิ่ม
    useEffect(() => {
        const arr = defaultDepartment
        listAll.forEach(ele => {
            if (!arr.includes(ele.department)) {
                arr.push(ele.department);
            }
        })
        setOptionDepartment(arr)
    }, [listAll])

    return (
        <div>
            <div id="title" className="text-head bg-white">
                อนุมัติเบิกจ่ายครุภัณฑ์
            </div>

            <div className="content mb-0">
                <Row className='text-head m-0'>
                    รายการเสนออนุมัติประจำวัน
                    <Col md="3">
                        <Datetime
                            className={`${filter.date && "btn-active"} headPickDateTime`}
                            initialValue='dd/mm/yyyy'
                            dateFormat="DD/MM/yyyy"
                            onChange={(event) => {
                                setFilter({ ...filter, date: new Date(event) })
                            }}
                            onClose={event => {
                                const date = (new Date(event))
                                const dateThai = date.toLocaleDateString('th-TH', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })
                                // set date to formatThai but some element render back
                                if (dateThai.includes("Invalid")) return
                                const em = document.getElementsByClassName("form-control")
                                em[0].value = dateThai
                            }}
                            timeFormat={false}
                            renderYear={renderYear}
                            renderMonth={renderMonth}
                        />

                        <i className="pi pi-calendar btn-calendar" />
                    </Col>
                    <Col md="3">
                        <Form.Select
                            className={filter.department && 'btn-active'}
                            size='sm'
                            value={filter.department}
                            onChange={e => setFilter({ ...filter, department: e.target.value })}
                        >
                            <option>หน่วยงานที่เสนอ / รหัส P4P</option>
                            {optionDepartment.map(val => {
                                return <option value={val}>{val}</option>
                            })}
                        </Form.Select>
                    </Col>
                    <Col md="3">
                        <Form.Control
                            size='sm'
                            value="ดูทั้งหมด"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                setFilter({ status: "All", date: "", department: "" })
                            }}
                        />
                    </Col>
                </Row>
            </div>

            <div className="content p-2 mt-0">
                <Row>
                    <Col md="auto" sm="6" xs="12">
                        <div
                            class={`btn-group btn-status ${filter.status === "All" && "btn-active"}`}
                            role="group"
                            onClick={() => setFilter({ ...filter, status: "All" })}
                        >
                            <button type="button" class="btn ">
                                <i className="pi pi-file" />
                            </button>
                            <button type="button" class="btn ">
                                ทั้งหมด
                            </button>
                            <button type="button" class="btn ">
                                <b>{listAll.length}</b>
                            </button>
                        </div>
                    </Col>
                    <Col md="auto" sm="6" xs="12">
                        <div
                            class={`btn-group btn-status ${filter.status === "Waiting" && "btn-active"}`}
                            variant='light' onClick={() => setFilter({ ...filter, status: "Waiting" })}
                        >
                            <button class="btn">
                                <i className="pi pi-clock" />
                            </button>
                            <button class="btn">
                                รออนุมัติ
                            </button>
                            <button class="btn">
                                <b>
                                    {listAll.filter(ele => ele.status === "Waiting").length}
                                </b>
                            </button>
                        </div>
                    </Col>
                    <Col md="auto" sm="6" xs="12">
                        <div
                            class={`btn-group btn-status ${filter.status === "Approve" && "btn-active"}`}
                            variant='light' onClick={() => setFilter({ ...filter, status: "Approve" })}
                        >
                            <button class="btn">
                                <i className="pi pi-check-circle" />
                            </button>
                            <button class="btn">
                                อนุมัติแล้ว
                            </button>
                            <button class="btn">
                                <b> {listAll.filter(ele => ele.status === "Approve").length}</b>
                            </button>
                        </div>
                    </Col>
                    <Col md="auto" sm="6" xs="12">
                        <div
                            class={`btn-group btn-status ${filter.status === "Reject" && "btn-active"}`}
                            variant='light' onClick={() => setFilter({ ...filter, status: "Reject" })}
                        >
                            <button class="btn">
                                <i className="pi pi-times-circle" />
                            </button>
                            <button class="btn">
                                Reject
                            </button>
                            <button class="btn">
                                <b>{listAll.filter(ele => ele.status === "Reject").length}</b>
                            </button>
                        </div>
                    </Col>
                </Row>
            </div>

            <Row>
                <Collapse in={showList} dimension="height">
                    <Col md="4">
                        <div className='content' style={{ width: "100%" }}>
                            <div className='text-head'>
                                <Stack direction="horizontal" gap={2}>
                                    รายการเสนออนุมัติ

                                    <Button
                                        // variant='light'
                                        className='btn-collapse ms-auto d-lg-block d-md-block d-none'
                                        onClick={() => setShowList(!showList)}>
                                        <i className="pi  pi-angle-left" />
                                    </Button>
                                </Stack>
                            </div>

                            <div class="rounded-bottom bg-white pb-2" style={{ minHeight: "45vh" }}>
                                {listAll?.filter(list => filter.status ? (filter.status === "All" ? list : list.status === filter.status) : list.status === "Waiting")
                                    .filter(list => filter.date ? moment(list.date).format('DD MM YYYY') === moment(filter.date).format('DD MM YYYY') : list)
                                    .filter(list => filter.department ? list.department === filter.department : list)
                                    .map((item, index) => (
                                        <Card
                                            className='box-item'
                                            onClick={() => {
                                                setErr(false)
                                                setSelectItem([item])
                                                console.log(item)
                                                setItems(item.inventory || [])
                                            }}
                                        >
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
                                                {item.status === "Waiting"
                                                    ? <>
                                                        <Button variant="danger" onClick={() => rejectItem(item.itemNo)}>Reject</Button>
                                                        <Button variant="success" onClick={() => approveItem(item.itemNo)}>อนุมัติ</Button>
                                                    </>
                                                    :
                                                    <div
                                                        class={item.status === "Approve" ? "text-success" : "text-danger"}
                                                    >
                                                        <strong>
                                                            {item.status}
                                                        </strong>
                                                    </div>
                                                }
                                            </Stack>
                                        </Card>
                                    ))}
                            </div>
                        </div>
                    </Col>
                </Collapse>

                <Col>
                    <div className="content pb-3">
                        <div
                            hidden={showList}
                            className={`expand`}
                            onClick={() => setShowList(true)}
                        >
                            <i className="pi  pi-angle-right" />
                        </div>

                        <div className='text-head'>
                            <Stack direction="horizontal" gap={2}>
                                <vr hidden={showList} />
                                รายการรอขออนุมัติเบิกจ่ายครุภัณฑ์
                                <Button variant="outline-success" className='ms-auto'
                                    onClick={() => setShowList(false)}>ดูรายละเอียด</Button>
                                <Button variant="outline-success"
                                    onClick={() => { window.print() }}
                                >
                                    พิมพ์
                                </Button>
                            </Stack>
                        </div>
                        <div className="printform">
                            <div className='text-head mb-3'>
                                <Stack direction="horizontal">
                                    บันทึกใบเบิกครุภัณฑ์
                                    <Button variant="success" className='ms-auto'
                                        type="submit" form="forms">
                                        บันทึก
                                    </Button>
                                </Stack>
                            </div>
                            <Form id="forms" onSubmit={submit}>
                                <ListBox
                                    selectItem={selectItem}
                                    renderMonth={renderMonth}
                                    renderYear={renderYear}
                                    optionDepartment={optionDepartment}
                                    callbackDateTime={value => setPickDateTime(value)}
                                />
                            </Form>
                            <TableForm
                                err={err}
                                callbackErr={val => setErr(val)}
                                callbackItem={setItems}
                                items={items}
                            />
                        </div>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col md="3" sm="12">
                    {nameSet.map(ele => (
                        <div className='content pb-3'>
                            <div className='text-head'>
                                {ele.field}
                            </div>
                            <div>
                                &nbsp;{ele.name}
                            </div>
                            <div>
                                &nbsp;{moment(ele.date).format("DD/MM/YYYY HH.mm")}
                            </div>
                        </div>
                    ))}
                </Col>
                {['ผู้แก้ไข', 'ผู้ส่งเรื่อง', 'ผู้อนุมัติ'].map((ele, i) => (
                    <Col md="3" sm="12">
                        <div className='content pb-3'>
                            <div className='text-head'>
                                {ele}
                            </div>
                            <div>
                                &nbsp;xxxxx xxxxxxxxxxx
                            </div>
                            <div>
                                &nbsp;
                                {i === 0 && moment(new Date()).add(6, 'hours').format("DD/MM/YYYY HH.mm")}
                                {i === 1 && moment(new Date()).add(1, 'days').format("DD/MM/YYYY HH.mm")}
                                {i === 2 && moment(new Date().setMinutes(30)).add(3, 'days').format("DD/MM/YYYY HH.mm")}
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
        // </div>
    )
}

function ListBox(props) {
    const [pickDateTime, setPickDateTime] = useState()
    const item = props.selectItem[0]
    const [optionVal, setOptionVal] = useState()

    useEffect(() => {
        setPickDateTime(props.selectItem[0].date)
        setOptionVal(item.department)
    }, [props.selectItem])

    return (
        <>
            <Table>
                <tr>
                    <td>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column>
                                ID ใบเบิก
                            </Form.Label>
                            <Col sm="12" lg="8">
                                <Form.Control
                                    name="id"
                                    size='sm'
                                    disabled
                                    defaultValue={item.itemId}
                                />
                            </Col>
                        </Form.Group>
                    </td>
                    <td>
                        <Form.Group as={Row} >
                            <Form.Label column>
                                เลขที่ใบเบิก
                            </Form.Label>
                            <Col sm="12" lg="8">
                                <Form.Control
                                    size='sm'
                                    name="itemNo"
                                    defaultValue={item.itemNo}
                                    className="text-bg-light"
                                    // disabled={item.itemId}
                                    readOnly
                                />
                            </Col>
                        </Form.Group>
                        {/* <a href="#" data-toggle="tooltip" title="Tooltip!">link</a>   */}
                    </td>
                    <td>
                        <Form.Group as={Row}>
                            <Form.Label column>
                                ทะเบียนเอกสาร
                            </Form.Label>
                            <Col sm="12" lg="8">
                                <Form.Control
                                    size='sm'
                                    name="regis"
                                    defaultValue={item.regis}
                                />
                            </Col>
                        </Form.Group>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Form.Group as={Row}>
                            <Form.Label column>
                                หน่วยงาน
                            </Form.Label>
                            <Col sm="12" lg="8">
                                <Form.Select size='sm'
                                    value={optionVal || ""}
                                    name="department"
                                    onChange={(e) => setOptionVal(e.target.value)}
                                >
                                    {!item.department && <option></option>}
                                    {props.optionDepartment.map(val => {
                                        return <option value={val}>{val}</option>
                                    })}
                                </Form.Select>
                            </Col>
                        </Form.Group>
                    </td>
                    <td>
                        <Form.Group as={Row}>
                            <Form.Label column>
                                ผู้มีสิทธิ์เบิก {item.name}
                            </Form.Label>
                            <Col sm="12" lg="8">
                                <Form.Control
                                    size='sm'
                                    name="name"
                                    defaultValue={item.name || ""}
                                />
                            </Col>
                        </Form.Group>
                    </td>
                    <td>
                        <Form.Group as={Row}>
                            <Form.Label column>
                                วันที่เบิก
                            </Form.Label>
                            <Col sm="12" lg="8">
                                <Datetime className='inForm'
                                    timeFormat="HH.mm"
                                    name="date"
                                    dateFormat="DD/MM/yyyy"
                                    locale='th' //*
                                    value={pickDateTime}
                                    onChange={ev => {
                                        setPickDateTime(new Date(ev))
                                        props.callbackDateTime(new Date(ev))
                                    }}
                                />
                                <i className="pi pi-calendar btn-calendar" />
                            </Col>
                        </Form.Group>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Form.Group as={Row} >
                            <Form.Label column>
                                หมายเหตุ
                            </Form.Label>
                            <Col sm="12" lg="8">
                                <Form.Control
                                    as="textarea"
                                    name="remark"
                                    defaultValue={item.remark}
                                />
                            </Col>
                        </Form.Group>
                    </td>
                    <td>
                        <Form.Group as={Row} className="align-text-top">
                            <Form.Label column>
                                จำนวนเงิน
                            </Form.Label>
                            <Col sm="12" lg="8">
                                <InputGroup size='sm'>
                                    <Form.Control
                                        label="xx"
                                        name="price"
                                        type='number'
                                        className='rounded-end'
                                    />
                                    <span className='input-group-text text-smaller bg-transparent border-0'>
                                        <small>
                                            บาท
                                        </small>
                                    </span>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                    </td>
                    <td>
                        <Form.Group as={Row} hidden={!pickDateTime}>
                            <Form.Label column>
                                ปีงบประมาณ
                            </Form.Label>
                            <Col sm="12" lg="8">
                                <Form.Select
                                    size='sm'
                                    name="year"
                                    defaultValue={parseInt(moment(pickDateTime).format('yyyy')) + 543}
                                >
                                    <option>{parseInt(moment(pickDateTime).format('yyyy')) + 543}</option>
                                    <option>{parseInt(moment(pickDateTime).add(1, "year").format('yyyy')) + 543}</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                    </td>
                </tr>
            </Table>
        </>
    )
}

function TableForm(props) {
    const item = props.items
    const tableHead = ['ลำดับ', 'เลขครุภัณฑ์', 'ชื่อครุภัณฑ์', 'ยี่ห้อ/รุ่น/ขนาด', 'Serial No.', 'ผู้ผลิต', 'ผู้จำหน่าย', 'จำนวนเงิน', '']

    const addItem = () => {
        props.callbackItem([...item, {}])
        props.callbackErr(false)
    }

    const deleteItem = (index) => {
        const newList = item.filter((item, ind) => (ind !== index))
        props.callbackItem(newList)
    }

    useEffect(() => {
        props.callbackItem(item)
    }, [item])

    return (
        <>
            <div className='text-head'>
                <Stack direction="horizontal">
                    รายงานใบเบิกครุภัณฑ์
                    <Button
                        variant={!props.err ? "success" : "outline-danger"}
                        className='ms-auto'
                        onClick={e => { e.preventDefault(); addItem() }}
                    >เพิ่มใบเบิกครุภัณฑ์</Button>
                </Stack>
            </div>
            <p>
                รวม: {item.length} รายการ
            </p>
            <Table hover>
                {tableHead.map(head => (
                    <th className='text-center'>
                        {head}
                    </th>
                ))}

                {item.map((ele, ind) => (
                    <tr>
                        <td align='center'>{ind + 1}</td>
                        <td>
                            <Form.Control
                                className="input-table"
                                name={tableHead[1]}
                                onChange={e => {
                                    item[ind] = { ...item[ind], [`${e.target.name}`]: e.target.value }
                                }}
                                defaultValue={ele?.เลขครุภัณฑ์ || ""}
                            />
                            {ele.เลขครุภัณฑ์}
                        </td>
                        <td>
                            <Form.Control
                                className="input-table"
                                name={tableHead[2]}
                                onChange={e => {
                                    item.splice(ind, 1, { ...item[ind], [`${e.target.name}`]: e.target.value })
                                }}
                                defaultValue={ele?.ชื่อครุภัณฑ์}
                            />
                            {ele?.ชื่อครุภัณฑ์}
                        </td>
                        <td>
                            <Form.Control
                                className="input-table"
                                name={tableHead[3]}
                                onChange={e => {
                                    item.splice(ind, 1, { ...item[ind], [`${e.target.name}`]: e.target.value })
                                }}
                                defaultValue={ele.detail}
                            />
                        </td>
                        <td>
                            <Form.Control
                                className="input-table"
                                name={tableHead[4]}
                                onChange={e => {
                                    item.splice(ind, 1, { ...item[ind], [`${e.target.name}`]: e.target.value })
                                }}
                                defaultValue={ele.serialNo}
                            />
                        </td>
                        <td>
                            <Form.Control
                                className="input-table"
                                name={tableHead[5]}
                                onChange={e => {
                                    item.splice(ind, 1, { ...item[ind], [`${e.target.name}`]: e.target.value })
                                }}
                                defaultValue={ele.ผู้ผลิต}
                            />
                        </td>
                        <td>
                            <Form.Control
                                className="input-table"
                                name={tableHead[6]}
                                onChange={e => {
                                    item.splice(ind, 1, { ...item[ind], [`${e.target.name}`]: e.target.value })
                                }}
                                defaultValue={ele.ผู้จำหน่าย}
                            />
                        </td>
                        <td>
                            <Form.Control
                                className="input-table"
                                name={tableHead[7]}
                                onChange={e => {
                                    item.splice(ind, 1, { ...item[ind], [`${e.target.name}`]: e.target.value })
                                }}
                                defaultValue={ele.จำนวนเงิน}
                            />
                        </td>
                        <td style={{ cursor: "pointer" }}
                            onClick={() => deleteItem(ind)}
                        >
                            <i className="pi pi-trash" />
                        </td>
                    </tr>
                ))}
            </Table>
        </>
    )
}

export default ConfirmPage