﻿using API_Restore.Common;
using API_Restore.Services.IServices;
using Microsoft.AspNetCore.Components.Forms;

namespace API_Restore.Services
{
    public class FileUpload : IFileUpload
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        public FileUpload(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }


        public bool DeleteFile(string filePath)
        {
            if (File.Exists(_webHostEnvironment.WebRootPath + filePath))
            {
                File.Delete(_webHostEnvironment.WebRootPath + filePath);
                return true;
            }
            return false;
        }

        public async Task<string> UploadFile(IBrowserFile file)
        {
            //สร้างชื่อไฟล์
            FileInfo fileInfo = new(file.Name);
            var fileName = Guid.NewGuid().ToString() + fileInfo.Extension;
            //โฟลเดอร์จัดเก็บ
            var folderDirectory = $"{_webHostEnvironment.WebRootPath}{SD.PRODUCTIMAGE}";


            if (!Directory.Exists(folderDirectory))
            {
                Directory.CreateDirectory(folderDirectory);
            }

            //บันทึกไฟล์ลงดิสก์
            var filePath = Path.Combine(folderDirectory, fileName);
            await using FileStream fs = new FileStream(filePath, FileMode.Create);
            await file.OpenReadStream().CopyToAsync(fs);

            //ชื่อไฟล์สำหรับบันทึกลง Database
            var fullPath = $"{SD.PRODUCTIMAGE}/{fileName}";
            return fullPath;
        }
    }
}
