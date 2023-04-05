import { MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('Root', 'sub1', <MailOutlined />, [
        getItem('Bisection', '/Bisection'),
        getItem('FalsePosition', '/FalsePosition'),
        getItem('OnePoint', '/OnePoint'),
        getItem('TaylorSeries', '/TaylorSeries'),
        getItem('NewtonRaphson', '/NewtonRaphson'),
        getItem('Secant', '/Secant'),
    ]),
   
    getItem('Linear', 'sub4', <SettingOutlined />, [
        getItem('CramerRule', '/CramerRule'),
        getItem('GaussElimination', '/Gauss Elimination'),
        getItem('Option 11', '11'),
        getItem('Option 12', '12'),
    ]),
];

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
const Dropdown1 = () => {
    const navigator = useNavigate()
    const [openKeys, setOpenKeys] = useState(['sub1']);
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    return (
        <Menu
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            style={{
                width: 256,
            }}
            items={items}
            onClick={({key})=>{navigator(key);}}
        />
    );
};
export default Dropdown1;