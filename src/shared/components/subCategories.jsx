import React, { useEffect, useState } from "react";
import { Button,TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addSubCategory, deleteSubCategory, getSubCategory } from "../../entities/api/subCategoryApi";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const SubCategory = () => {
  const subCategory = useSelector((state) => state.subCategory.subCategory);
  const dispatch = useDispatch();
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");

  useEffect(() => {
    dispatch(getSubCategory());
  }, []);

  const handleAddSubCategory = () => {
    const newSubCategory = {
      subCategoryName: subCategoryName,
      CategoryId: Number(subCategoryId),
    };
    dispatch(addSubCategory(newSubCategory));
    setSubCategoryName("");
    setSubCategoryId("");
  };

  return (
    <article className='flex items-start justify-between'>
      <table className='w-[410px]'>
        <thead className='border-b-[2px] h-[56px] border-[#E6E9F4]'>
          <tr>
            <th className='text-left text-[#5A607F]'>SubCategories</th>
            <th className='text-[#5A607F] text-end'>Action</th>
          </tr>
        </thead>
        <tbody>
          { subCategory.map((e) => {
            return (
              <tr key={e.id} className='border-b-[1px] h-[56px] border-[#E6E9F4]'>
                <td>{e.subCategoryName}</td>
                <td className='text-end'>
                  <BorderColorOutlinedIcon className="text-[#2563EB] cursor-pointer" />
                  <DeleteOutlineOutlinedIcon onClick={() => dispatch(deleteSubCategory(e.id))} className="text-[red] cursor-pointer" />
                </td>
              </tr>
            )})
          }
        </tbody>
      </table>
      
      <article className='w-[455px] text-end border-[#E5E5E5] border-[1px] p-[28px] rounded-[4px]'>
        <h2 className='mb-[24px] text-start text-[20px] font-bold'>Add new subCategory</h2>
        <TextField
          fullWidth
          label="Subcategory Name"
          variant="outlined"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Category ID"
          variant="outlined"
          type="number"
          value={subCategoryId}
          onChange={(e) => setSubCategoryId(e.target.value)}
        />
        <Button
          variant="contained"
          size="large"
          onClick={handleAddSubCategory}
          sx={{ mt: 2 }}
        >
          Create
        </Button>
      </article>
    </article>
  );
};

export default SubCategory;
