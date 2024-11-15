using Microsoft.EntityFrameworkCore;

namespace API_Restore.Business.RequestHelpers
{
    public class PageList<T> : List<T>
    {
        public PageList(List<T> items, int count, int pageNumber, int pageSize)
        {
            MetaData = new MetaData
            {
                TotalCount = count,
                PageSize = pageSize,
                CurrentPage = pageNumber,
                TotalPages = (int)Math.Ceiling(count / (double)pageSize)
            };
            AddRange(items);
        }

        public MetaData MetaData { get; set; }
        public static async Task<PageList<T>> ToPagedList(
            IQueryable<T> query, int pageNumber, int pageSize)
        {
            var count = await query.CountAsync();
            var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

            return new PageList<T>(items, count, pageNumber, pageSize);
        }

        //public PageList(IEnumerable<T> items, int count, int pageNumber, int pageSize)
        //{
        //    MetaData = new MetaData
        //    {
        //        TotalCount = count,
        //        PageSize = pageSize,
        //        CurrentPage = pageNumber,
        //        TotalPages = (int)Math.Ceiling(count / (double)pageSize)
        //    };
        //    Items = items; // ใช้ IEnumerable<T>
        //}

        //public MetaData MetaData { get; set; }
        //public IEnumerable<T> Items { get; set; } // เปลี่ยนเป็น IEnumerable

        //// Method สำหรับสร้าง PageList จาก query  
        //public static async Task<PageList<T>> ToPagedList(
        //    IQueryable<T> query, int pageNumber, int pageSize)
        //{
        //    // นับจำนวนทั้งหมดของข้อมูล
        //    var count = await query.CountAsync();

        //    // ดึงข้อมูลเฉพาะหน้าปัจจุบัน
        //    var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync(); // ยังคงใช้ List<T> ชั่วคราวเพราะ EF Core คืนค่าเป็น List

        //    // ส่งข้อมูลเป็น IEnumerable<T>
        //    return new PageList<T>(items, count, pageNumber, pageSize);
        //}
    }
}
