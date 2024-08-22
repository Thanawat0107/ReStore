using Microsoft.AspNetCore.Components.Forms;

namespace API_Restore.Services.IServices
{
    public interface IFileUpload
    {
        Task<string> UploadFile(IBrowserFile file);
        bool DeleteFile(string filePath);
    }
}
