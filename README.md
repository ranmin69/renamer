# Rename

一个用于批量重命名文件的命令行工具，基于 Deno 构建，支持多种排序策略，自动避免文件名冲突。

## 安装

```shell
deno install --allow-all -n rename bitch.ts
```

### 更新（重新安装）

```shell
deno install -f --allow-all -n rename bitch.ts
```

---

## 基本用法

> **⚠️ 在目标文件所在的目录下运行命令。**

| 参数 | 说明 | 必填 | 默认值 |
|------|------|:----:|--------|
| `--name` | 重命名后的基础文件名（不含序号和扩展名） | ✅ | - |
| `--start` | 序号起始数字，文件名从该数字开始递增 | ❌ | `1` |
| `--sort` | 排序方式，决定文件处理顺序（见下方） | ❌ | `""` |
| `--type` | 设为 `test` 时仅预览，不实际执行 | ❌ | - |

```shell
rename --start 31 --name 100097210_p --sort 'BTDescending'
```

### 预览模式

> **建议：正式重命名前先预览确认结果。**

```shell
rename --start 1 --name photo --sort 'BTAscending' --type test
```

---

## 排序方式

排序决定文件被重命名的顺序——排在前面的文件获得更小的序号。

### 排序类型

| 排序值 | 说明 |
|--------|------|
| `BTAscending` | 按**创建时间**升序（最早创建的排最前） |
| `BTDescending` | 按**创建时间**降序（最晚创建的排最前） |
| `MTAscending` | 按**修改时间**升序（最早修改的排最前） |
| `MTDescending` | 按**修改时间**降序（最晚修改的排最前） |
| `ATAscending` | 按**访问时间**升序（最早访问的排最前） |
| `ATDescending` | 按**访问时间**降序（最晚访问的排最前） |
| `NAscending` | 按**文件名数字**升序（数字小的排最前） |
| `NDescending` | 按**文件名数字**降序（数字大的排最前） |
| `""`（不传） | 不排序，保持文件系统读取顺序 |

### 命名规则

排序值 = **前缀** + **方向**：

- **前缀**
  - `BT` = Birth Time（创建时间）
  - `MT` = Modify Time（修改时间）
  - `AT` = Access Time（访问时间）
  - `N` = Name（文件名数字部分）
- **方向**
  - `Ascending` = 升序（从小到大）
  - `Descending` = 降序（从大到小）

### 排序示例

假设文件夹中有以下图片：

```
a.jpg   → 创建于 10:00
b.jpg   → 创建于 08:00
c.jpg   → 创建于 12:00
```

```shell
rename --name photo --start 1 --sort 'BTAscending'
```

按创建时间升序排列：`b(08:00) → a(10:00) → c(12:00)`

```
b.jpg → photo1.jpeg
a.jpg → photo2.jpeg
c.jpg → photo3.jpeg
```

---

## 注意事项

- 只处理**文件**，子目录自动跳过
- `.jpg` 扩展名自动转为 `.jpeg`
- 采用两阶段重命名（先改临时名，再改最终名），不会出现新文件名覆盖旧文件的问题
