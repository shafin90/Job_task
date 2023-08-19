import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Checkbox,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface Department {
  department: string;
  sub_departments: string[];
}

const initialDepartments: Department[] = [
  {
    department: 'customer_service',
    sub_departments: ['support', 'customer_success'],
  },
  {
    department: 'design',
    sub_departments: ['graphic_design', 'product_design', 'web_design'],
  },
];

const DepartmentList: React.FC = () => {
  const [open, setOpen] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  const handleClick = (dept: string) => {
    if (open.includes(dept)) {
      setOpen(open.filter((d) => d !== dept));
    } else {
      setOpen([...open, dept]);
    }
  };

  const handleSubDeptToggle = (
    event: React.ChangeEvent<HTMLInputElement>,
    subDept: string,
    department: string
  ) => {
    event.stopPropagation();

    const departmentInfo = initialDepartments.find(
      (dept) => dept.department === department
    );
    const subDepts = departmentInfo?.sub_departments || [];

    if (selectedDepartments.includes(subDept)) {
      setSelectedDepartments(selectedDepartments.filter((d) => d !== subDept));

      if (subDepts.every((sub) => !selectedDepartments.includes(sub))) {
        setSelectedDepartments(
          selectedDepartments.filter((d) => d !== department)
        );
      }
    } else {
      setSelectedDepartments([...selectedDepartments, subDept]);

      if (subDepts.every((sub) => selectedDepartments.includes(sub))) {
        setSelectedDepartments([...selectedDepartments, department]);
      }
    }
  };

  const handleSelectAllSubDepartments = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    department: string
  ) => {
    event.stopPropagation();

    const selectedSubDepartments = initialDepartments
      .find((dept) => dept.department === department)
      ?.sub_departments || [];

    setSelectedDepartments((prevSelected) => {
      if (prevSelected.includes(department)) {
        return prevSelected.filter(
          (dept) =>
            dept !== department && !selectedSubDepartments.includes(dept)
        );
      } else {
        return [...prevSelected, department, ...selectedSubDepartments];
      }
    });
  };

  return (
    <List>
      {initialDepartments.map((dept) => (
        <React.Fragment key={dept.department}>
          <ListItem button onClick={() => handleClick(dept.department)}>
            <ListItemIcon>
              <Checkbox
                checked={selectedDepartments.includes(dept.department)}
                indeterminate={dept.sub_departments.some((subDept) =>
                  selectedDepartments.includes(subDept)
                )}
                onClick={(event) => event.stopPropagation()}
                onChange={(event) =>
                  handleSelectAllSubDepartments(event, dept.department)
                }
              />
            </ListItemIcon>
            <ListItemText primary={dept.department} />
            {open.includes(dept.department) ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse
            in={open.includes(dept.department)}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {dept.sub_departments.map((subDept) => (
                <ListItem
                  key={subDept}
                  button
                  onClick={(event) =>
                    handleSubDeptToggle(event, subDept, dept.department)
                  }
                  style={{ paddingLeft: '24px' }}
                >
                  <ListItemIcon>
                    <Checkbox
                      checked={selectedDepartments.includes(subDept)}
                      onClick={(event) => event.stopPropagation()}
                      onChange={(event) =>
                        handleSubDeptToggle(event, subDept, dept.department)
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary={subDept} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

export default DepartmentList;
