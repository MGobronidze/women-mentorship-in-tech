const output = document.getElementById("output");

    // 1) GET
    document.getElementById("getBtn").onclick = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
      const data = await res.json();
      output.textContent = JSON.stringify(data, null, 2);
    };

    // 2) POST
    document.getElementById("postBtn").onclick = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "გამარჯობა", body: "ტესტი", userId: 1 })
      });
      const data = await res.json();
      output.textContent = JSON.stringify(data, null, 2);
    };

    async function updatePost() {
    try {
          const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            // PUT-ში ვგზავნით ყველა ველს
            body: JSON.stringify({
            id: 1,
            title: "ახალი სათაური",
            body: "ახალი ტექსტი",
            userId: 1
            })
        });
        if (!res.ok) throw new Error("სტატუსი: " + res.status);
        console.log(await res.json());
    } catch (err) {
      console.error("შეცდომა:", err.message);
    }
}
updatePost();

async function patchPost() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        // PATCH-ში ვგზავნით მხოლოდ იმას, რაც იცვლება
        body: JSON.stringify({ title: "მხოლოდ სათაური შევცვალე" })
        });
      if (!res.ok) throw new Error("სტატუსი: " + res.status);
        console.log(await res.json()); // დანარჩენი ველები უცვლელია
  } catch (err) {
        console.error("შეცდომა:", err.message);
}
}
patchPost()

async function deletePost() {
  try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
        method: "DELETE" // მხოლოდ მეთოდი და URL (id-ით)
        });
      if (!res.ok) throw new Error("სტატუსი: " + res.status);
        console.log("წაიშალა! სტატუსი:", res.status);
      } catch (err) {
        console.error("შეცდომა:", err.message);
  }
}
deletePost();


    // 3) 404
    document.getElementById("errBtn").onclick = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users/99999");
      output.textContent = "სტატუსი: " + res.status;
    };