Add-Type -AssemblyName System.Drawing

$srcPath = Join-Path $PSScriptRoot "..\public\logo.png"
$dstPath = Join-Path $PSScriptRoot "..\public\logo.png.transparent.png"

$src = [System.Drawing.Bitmap]::FromFile($srcPath)
$w = $src.Width
$h = $src.Height

$bmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.DrawImage($src, 0, 0, $w, $h)
$g.Dispose()
$src.Dispose()

$rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
$data = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$bufferSize = $data.Stride * $h
$bytes = New-Object byte[] $bufferSize
[System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $bytes.Length)

$threshold = 225
$stride = $data.Stride
$total = $w * $h
$visited = New-Object bool[] $total
$queue = New-Object System.Collections.Generic.Queue[int]

# Seed BFS from border pixels
for ($x = 0; $x -lt $w; $x++) {
    foreach ($y in 0, ($h - 1)) {
        $p = $y * $w + $x
        $byteIdx = $y * $stride + $x * 4
        if ($bytes[$byteIdx] -ge $threshold -and $bytes[$byteIdx + 1] -ge $threshold -and $bytes[$byteIdx + 2] -ge $threshold) {
            $visited[$p] = $true
            $queue.Enqueue($p)
        }
    }
}
for ($y = 0; $y -lt $h; $y++) {
    foreach ($x in 0, ($w - 1)) {
        $p = $y * $w + $x
        if (-not $visited[$p]) {
            $byteIdx = $y * $stride + $x * 4
            if ($bytes[$byteIdx] -ge $threshold -and $bytes[$byteIdx + 1] -ge $threshold -and $bytes[$byteIdx + 2] -ge $threshold) {
                $visited[$p] = $true
                $queue.Enqueue($p)
            }
        }
    }
}

while ($queue.Count -gt 0) {
    $p = $queue.Dequeue()
    $x = $p % $w
    $y = [int][Math]::Floor($p / $w)
    $byteIdx = $y * $stride + $x * 4
    $bytes[$byteIdx + 3] = 0  # alpha = 0

    if ($x -gt 0) {
        $np = $p - 1
        if (-not $visited[$np]) {
            $nb = $byteIdx - 4
            if ($bytes[$nb] -ge $threshold -and $bytes[$nb + 1] -ge $threshold -and $bytes[$nb + 2] -ge $threshold) {
                $visited[$np] = $true
                $queue.Enqueue($np)
            }
        }
    }
    if ($x -lt ($w - 1)) {
        $np = $p + 1
        if (-not $visited[$np]) {
            $nb = $byteIdx + 4
            if ($bytes[$nb] -ge $threshold -and $bytes[$nb + 1] -ge $threshold -and $bytes[$nb + 2] -ge $threshold) {
                $visited[$np] = $true
                $queue.Enqueue($np)
            }
        }
    }
    if ($y -gt 0) {
        $np = $p - $w
        if (-not $visited[$np]) {
            $nb = $byteIdx - $stride
            if ($bytes[$nb] -ge $threshold -and $bytes[$nb + 1] -ge $threshold -and $bytes[$nb + 2] -ge $threshold) {
                $visited[$np] = $true
                $queue.Enqueue($np)
            }
        }
    }
    if ($y -lt ($h - 1)) {
        $np = $p + $w
        if (-not $visited[$np]) {
            $nb = $byteIdx + $stride
            if ($bytes[$nb] -ge $threshold -and $bytes[$nb + 1] -ge $threshold -and $bytes[$nb + 2] -ge $threshold) {
                $visited[$np] = $true
                $queue.Enqueue($np)
            }
        }
    }
}

[System.Runtime.InteropServices.Marshal]::Copy($bytes, 0, $data.Scan0, $bytes.Length)
$bmp.UnlockBits($data)

$bmp.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

Write-Output "Saved: $dstPath"
