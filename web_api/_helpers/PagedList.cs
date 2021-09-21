using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using web_api.models;
using Microsoft.EntityFrameworkCore;

namespace web_api._helpers
{
    public class PagedList<T>: List<T>
    {
       public int Currentpage { get; set; }
       public int TotalPages { get; set; }
       public int PageSize { get; set; }
       public int TotalCount { get; set; }

       public PagedList(List<T> items, int count, int pageNumber, int pageSize)
       {
           TotalCount = count;
           PageSize = pageSize;
           Currentpage = pageNumber;
           TotalPages = (int)System.Math.Ceiling(count / (double)pageSize);
           this.AddRange(items);
       }

       public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize)
       {
           
           var count = await source.CountAsync();
           var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
           return new PagedList<T>(items, count, pageNumber, pageSize);
       }

       public PagedList<T> Create(List<T> source, int pageNumber, int pageSize){
            var count = source.Count();
            var items = source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
            return new PagedList<T>(items, count, pageNumber, pageSize);
       }
    }
}