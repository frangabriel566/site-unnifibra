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

$bytes = New-Object byte[] ($data.Stride * $h)
[System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $bytes.Length)

$threshold = 245
$visited = New-Object bool[] ($w * $h)
$queue = New-Object System.Collections.Generic.Queue[int]

function Test-NearWhite([int]$idx) {
    $b = $bytes[$idx]
    $g8 = $bytes[$idx + 1]
    $r = $bytes[$idx + 2]
    return ($r -ge $threshold -and $g8 -ge $threshold -and $b -ge $threshold)
}

# Seed BFS from border pixels
for ($x = 0; $x -lt $w; $x++) {
    foreach ($y in 0, ($h - 1)) {
        $p = $y * $w + $x
        if (-not $visited[$p]) {
            $byteIdx = $y * $data.Stride + $x * 4
            if (Test-NearWhite $byteIdx) {
                $visited[$p] = $true
                $queue.Enqueue($p)
            }
        }
    }
}
for ($y = 0; $y -lt $h; $y++) {
    foreach ($x in 0, ($w - 1)) {
        $p = $y * $w + $x
        if (-not $visited[$p]) {
            $byteIdx = $y * $data.Stride + $x * 4
            if (Test-NearWhite $byteIdx) {
                $visited[$p] = $true
                $queue.Enqueue($p)
            }
        }
    }
}

while ($queue.Count -gt 0) {
    $p = $queue.Dequeue()
    $x = $p % $w
    $y = [int]($p / $w)
    $byteIdx = $y * $data.Stride + $x * 4
    $bytes[$byteIdx + 3] = 0  # alpha = 0

    # neighbors
    for ($d = 0; $d -lt 4; $d++) {
        switch ($d) {
            0 { $nx = $x - 1; $ny = $y }
            1 { $nx = $x + 1; $ny = $y }
            2 { $nx = $x; $ny = $y - 1 }
            3 { $nx = $x; $ny = $y + 1 }
        }
        if ($nx -ge 0 -and $nx -lt $w -and $ny -ge 0 -and $ny -lt $h) {
            $np = $ny * $w + $nx
            if (-not $visited[$np]) {
                $nByteIdx = $ny * $data.Stride + $nx * 4
                if (Test-NearWhite $nByteIdx) {
                    $visited[$np] = $true
                    $queue.Enqueue($np)
                }
            }
        }
    }
}

[System.Runtime.InteropServices.Marshal]::Copy($bytes, 0, $data.Scan0, $bytes.Length)
$bmp.UnlockBits($data)

$bmp.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

Write-Output "Saved: $dstPath"
