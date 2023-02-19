import { useState } from 'react';
import { ProSidebarProvider, useProSidebar } from 'react-pro-sidebar';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

function Tabsidebar(props) {
    const [showMenu, setShowMenu] = useState(props.collapse)

    const data = (
        <>
            <div className='ps-menu-button-head' disabled>
                ตัวอย่าง
            </div>
            <Menu>
                {/* {props.collapse && !showMenu && */}
                {!props.mode &&
                    <MenuItem onClick={() => setShowMenu(!showMenu)}>
                        Menu
                    </MenuItem>
                }
            </Menu>
            <Menu color='red'>
                {/* <MenuItem> กลับเมนูหลัก </MenuItem> */}
                <SubMenu
                    label="งานบริหารทรัพย์สิน"
                    defaultOpen={true}
                >
                    <MenuItem>Dashboard</MenuItem>
                    <MenuItem>ข้อมูลครุภัณฑ์</MenuItem>
                    <MenuItem>ข้อมูลครุภัณฑ์เป็นชุด</MenuItem>
                    {/* <MenuItem>เบิกครุภัณฑ์</MenuItem> */}
                    <SubMenu label="เบิกครุภัณฑ์">
                        <MenuItem>
                            รายการเบิกจ่ายครุภัณฑ์
                        </MenuItem>
                        <MenuItem>
                            บันทึกเบิกจ่ายครุภัณฑ์
                        </MenuItem>
                        <MenuItem>
                            อนุมัติเบิกจ่ายครุภัณฑ์
                        </MenuItem>
                    </SubMenu>
                </SubMenu>
            </Menu>
        </>
    )

    // const { toggleSidebar } = useProSidebar();

    return (
        <div className={props.collapse && !showMenu && 'sidebar mobile'}>
            <ProSidebarProvider>
                <Sidebar
                    customBreakPoint="767px"
                    // hidden={props.mode == "collapse"}
                    defaultCollapsed={showMenu || false}
                    collapsedWidth="5.5rem"
                >
                    {!showMenu
                        ? data
                        : <Menu>
                            <MenuItem onClick={() => setShowMenu(!showMenu)}>
                                Menu
                            </MenuItem>
                        </Menu>
                    }
                </Sidebar>
            </ProSidebarProvider>
            {props.mode === "mobile" &&
                <ProSidebarProvider>
                    <Sidebar>
                        {data}
                    </Sidebar>
                </ProSidebarProvider>
            }
        </div>
    )
}

export default Tabsidebar;
